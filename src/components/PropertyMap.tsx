import { useEffect, useState, lazy, Suspense } from "react";
import type { PropertyData } from "@/components/PropertyCard";

export type LatLng = { lat: number; lng: number };

export interface PropertyMapProps {
  properties: PropertyData[];
  polygon: LatLng[] | null;
  onPolygonChange: (poly: LatLng[] | null) => void;
  drawing: boolean;
  onDrawingChange: (v: boolean) => void;
}

const Inner = lazy(() => import("./PropertyMapInner"));

export function PropertyMap(props: PropertyMapProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="h-[560px] w-full rounded-2xl bg-muted/30 border border-border flex items-center justify-center text-sm text-muted-foreground">
        Loading map…
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="h-[560px] w-full rounded-2xl bg-muted/30 border border-border flex items-center justify-center text-sm text-muted-foreground">
          Loading map…
        </div>
      }
    >
     <div className="property_map">
       <Inner {...props} />
     </div>
    </Suspense>
  );
}
