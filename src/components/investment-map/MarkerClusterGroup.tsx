import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet.markercluster";

export interface ClusterPoint {
  id: string;
  lat: number;
  lon: number;
  icon: L.DivIcon | L.Icon;
  popupHtml?: string;
  tooltipHtml?: string;
}

interface Props {
  points: ClusterPoint[];
  /** Min zoom at which clusters break apart. Default 9. */
  disableClusteringAtZoom?: number;
  /** Color used for cluster bubbles. */
  bubbleColor?: string;
}

/**
 * Thin react-leaflet wrapper over Leaflet.markercluster. Created imperatively
 * because the published react-leaflet binding lags behind react-leaflet 5.
 */
export default function MarkerClusterGroup({
  points,
  disableClusteringAtZoom = 10,
  bubbleColor = "#193959",
}: Props) {
  const map = useMap();
  const groupRef = useRef<L.MarkerClusterGroup | null>(null);

  useEffect(() => {
    const group = (L as unknown as {
      markerClusterGroup: (opts: L.MarkerClusterGroupOptions) => L.MarkerClusterGroup;
    }).markerClusterGroup({
      showCoverageOnHover: false,
      spiderfyOnMaxZoom: true,
      disableClusteringAtZoom,
      maxClusterRadius: 50,
      iconCreateFunction: (cluster) => {
        const count = cluster.getChildCount();
        const size = count < 10 ? 32 : count < 50 ? 38 : 46;
        return L.divIcon({
          className: "",
          html:
            `<div style="background:${bubbleColor};color:white;width:${size}px;height:${size}px;` +
            `border-radius:50%;display:flex;align-items:center;justify-content:center;` +
            `font-weight:700;font-size:13px;box-shadow:0 2px 8px rgba(0,0,0,0.25);` +
            `border:2px solid white;">${count}</div>`,
          iconSize: [size, size],
        });
      },
    });
    map.addLayer(group);
    groupRef.current = group;
    return () => {
      map.removeLayer(group);
      groupRef.current = null;
    };
  }, [map, disableClusteringAtZoom, bubbleColor]);

  useEffect(() => {
    const group = groupRef.current;
    if (!group) return;
    group.clearLayers();
    const markers: L.Marker[] = points.map((p) => {
      const m = L.marker([p.lat, p.lon], { icon: p.icon });
      if (p.tooltipHtml) m.bindTooltip(p.tooltipHtml, { direction: "top", offset: [0, -8] });
      if (p.popupHtml) m.bindPopup(p.popupHtml);
      return m;
    });
    group.addLayers(markers);
  }, [points]);

  return null;
}
