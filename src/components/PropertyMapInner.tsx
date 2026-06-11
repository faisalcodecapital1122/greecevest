import { useEffect, useMemo, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polygon,
  Polyline,
  CircleMarker,
  useMap,
  useMapEvent,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Undo2, Check, X } from "lucide-react";
import type { PropertyMapProps, LatLng } from "./PropertyMap";

// Fix default marker icons (Vite/SSR)
const markerIcon = L.divIcon({
  className: "",
  html: `<div style="width:34px;height:34px;background:hsl(var(--accent, 200 80% 75%));border:2px solid white;border-radius:50% 50% 50% 0;transform:rotate(-45deg);box-shadow:0 4px 10px rgba(0,0,0,.25);"></div>`,
  iconSize: [34, 34],
  iconAnchor: [17, 34],
  popupAnchor: [0, -30],
});

function DrawCapture({
  drawing,
  onAddPoint,
}: {
  drawing: boolean;
  onAddPoint: (p: LatLng) => void;
}) {
  const map = useMap();

  // Disable interactions that conflict with tap-to-draw
  useEffect(() => {
    if (!drawing) return;
    const dz = map.doubleClickZoom.enabled();
    map.doubleClickZoom.disable();
    const prevCursor = map.getContainer().style.cursor;
    map.getContainer().style.cursor = "crosshair";
    return () => {
      if (dz) map.doubleClickZoom.enable();
      map.getContainer().style.cursor = prevCursor;
    };
  }, [drawing, map]);

  useMapEvent("click", (e) => {
    if (!drawing) return;
    onAddPoint({ lat: e.latlng.lat, lng: e.latlng.lng });
  });

  return null;
}

function FitToPolygon({ polygon }: { polygon: LatLng[] | null }) {
  const map = useMap();
  useEffect(() => {
    if (polygon && polygon.length > 2) {
      const bounds = L.latLngBounds(polygon.map((p) => [p.lat, p.lng] as [number, number]));
      map.fitBounds(bounds, { padding: [40, 40] });
    }
  }, [polygon, map]);
  return null;
}

export default function PropertyMapInner({
  properties,
  polygon,
  onPolygonChange,
  drawing,
  onDrawingChange,
}: PropertyMapProps) {
  const center = useMemo<[number, number]>(() => {
    const withCoords = properties.filter((p) => p.lat && p.lng);
    if (withCoords.length === 0) return [38.5, 23.5];
    const lat = withCoords.reduce((s, p) => s + (p.lat ?? 0), 0) / withCoords.length;
    const lng = withCoords.reduce((s, p) => s + (p.lng ?? 0), 0) / withCoords.length;
    return [lat, lng];
  }, [properties]);

  // In-progress points while drawing
  const [points, setPoints] = useState<LatLng[]>([]);

  // Reset draft when toggling off
  useEffect(() => {
    if (!drawing) setPoints([]);
  }, [drawing]);

  const addPoint = (p: LatLng) => setPoints((pts) => [...pts, p]);
  const undo = () => setPoints((pts) => pts.slice(0, -1));
  const finish = () => {
    if (points.length >= 3) {
      onPolygonChange(points);
      onDrawingChange(false);
      setPoints([]);
    }
  };
  const cancel = () => {
    setPoints([]);
    onDrawingChange(false);
  };

  const positions = points.map((p) => [p.lat, p.lng] as [number, number]);

  return (
    <div className="relative h-[560px] w-full rounded-2xl overflow-hidden border border-border shadow-sm">
      <MapContainer
        center={center}
        zoom={6}
        scrollWheelZoom
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {polygon && polygon.length > 2 && !drawing && (
          <Polygon
            positions={polygon.map((p) => [p.lat, p.lng] as [number, number])}
            pathOptions={{
              color: "#86c9f2",
              weight: 3,
              fillColor: "#86c9f2",
              fillOpacity: 0.18,
            }}
          />
        )}

        {/* Draft polygon/polyline while drawing */}
        {drawing && positions.length >= 3 && (
          <Polygon
            positions={positions}
            pathOptions={{
              color: "#86c9f2",
              weight: 3,
              fillColor: "#86c9f2",
              fillOpacity: 0.18,
              dashArray: "6 6",
            }}
          />
        )}
        {drawing && positions.length === 2 && (
          <Polyline
            positions={positions}
            pathOptions={{ color: "#86c9f2", weight: 3, dashArray: "6 6" }}
          />
        )}
        {drawing &&
          positions.map((pos, i) => (
            <CircleMarker
              key={i}
              center={pos}
              radius={6}
              pathOptions={{
                color: "#193959",
                weight: 2,
                fillColor: "#ffffff",
                fillOpacity: 1,
              }}
            />
          ))}

        {properties
          .filter((p) => p.lat && p.lng)
          .map((p) => (
            <Marker key={p.id} position={[p.lat!, p.lng!]} icon={markerIcon}>
              <Popup>
                <div className="w-52">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-24 object-cover rounded-md mb-2"
                  />
                  <div className="text-xs font-semibold text-foreground line-clamp-2">
                    {p.title}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {p.location}, {p.region}
                  </div>
                  <div className="text-sm font-bold text-accent mt-1">{p.price}</div>
                  <Link
                    to="/properties/$id"
                    params={{ id: p.id }}
                    className="block mt-2 text-xs font-medium text-primary hover:underline"
                  >
                    View details →
                  </Link>
                </div>
              </Popup>
            </Marker>
          ))}

        <DrawCapture drawing={drawing} onAddPoint={addPoint} />
        <FitToPolygon polygon={polygon} />
      </MapContainer>

      {drawing && (
        <>
          {/* Instruction banner */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 z-[1000] bg-card/95 backdrop-blur rounded-full border border-border shadow-md px-4 py-2 text-xs font-medium text-foreground max-w-[calc(100%-1.5rem)] text-center">
            {points.length < 3
              ? `Tap the map to add points (${points.length}/3 min)`
              : `${points.length} points added. Tap Finish when ready.`}
          </div>

          {/* Action bar */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-[1000] flex items-center gap-2 bg-card/95 backdrop-blur rounded-full border border-border shadow-lg p-1.5">
            <Button
              size="sm"
              variant="ghost"
              className="h-9 px-3 rounded-full"
              onClick={undo}
              disabled={points.length === 0}
            >
              <Undo2 className="h-4 w-4 mr-1" /> Undo
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-9 px-3 rounded-full text-muted-foreground"
              onClick={cancel}
            >
              <X className="h-4 w-4 mr-1" /> Cancel
            </Button>
            <Button
              size="sm"
              className="h-9 px-4 rounded-full bg-accent text-accent-foreground hover:bg-accent/90"
              onClick={finish}
              disabled={points.length < 3}
            >
              <Check className="h-4 w-4 mr-1" /> Finish
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
