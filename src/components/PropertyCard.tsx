import { useState } from "react";
import { LocaleLink as Link, useTx } from "@/i18n/locale";
import {
  MapPin,
  BedDouble,
  Bath,
  LandPlot,
  Maximize2,
  Heart,
  Waves,
  Eye,
  Mountain,
  Trees,
  Car,
  Flame,
  Snowflake,
  Sun,
  Sparkles,
  ArrowUpDown,
  Sofa,
  Umbrella,
  Wifi,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { agencyByName } from "@/data/agencies";

export type PropertyFeature =
  | "pool"
  | "seaview"
  | "mountainview"
  | "garden"
  | "parking"
  | "fireplace"
  | "aircon"
  | "solar"
  | "renovated"
  | "elevator"
  | "balcony"
  | "furnished"
  | "nearbeach"
  | "smarthome";

export const PROPERTY_FEATURE_META: Record<PropertyFeature, { label: string; icon: typeof Waves }> =
  {
    pool: { label: "Swimming Pool", icon: Waves },
    seaview: { label: "Sea View", icon: Eye },
    mountainview: { label: "Mountain View", icon: Mountain },
    garden: { label: "Garden", icon: Trees },
    parking: { label: "Parking", icon: Car },
    fireplace: { label: "Fireplace", icon: Flame },
    aircon: { label: "Air Conditioning", icon: Snowflake },
    solar: { label: "Solar Panels", icon: Sun },
    renovated: { label: "Recently Renovated", icon: Sparkles },
    elevator: { label: "Elevator", icon: ArrowUpDown },
    balcony: { label: "Balcony / Terrace", icon: Umbrella },
    furnished: { label: "Furnished", icon: Sofa },
    nearbeach: { label: "Near Beach", icon: Waves },
    smarthome: { label: "Smart Home", icon: Wifi },
  };

export interface PropertyDataTranslations {
  title?: string;
  location?: string;
  region?: string;
  type?: string;
}

export interface PropertyData {
  id: string;
  image: string;
  title: string;
  location: string;
  region: string;
  price: string;
  size: string;
  bedrooms: number;
  bathrooms: number;
  plotSize: string;
  type: string;
  features?: PropertyFeature[];
  agency?: string;
  lat?: number;
  lng?: number;
  el?: PropertyDataTranslations;
}

export function PropertyCard({ property }: { property: PropertyData }) {
  const tx = useTx();
  const [saved, setSaved] = useState(false);
  const title = tx(property.title, property.el?.title ?? property.title);
  const location = tx(property.location, property.el?.location ?? property.location);
  const region = tx(property.region, property.el?.region ?? property.region);
  const type = tx(property.type, property.el?.type ?? property.type);
  const bedLabel = tx(
    property.bedrooms === 1 ? "bed" : "beds",
    property.bedrooms === 1 ? "υπν." : "υπν.",
  );
  const bathLabel = tx(
    property.bathrooms === 1 ? "bath" : "baths",
    property.bathrooms === 1 ? "μπάνιο" : "μπάνια",
  );

  return (
    <article className="group bg-card rounded-2xl border border-border overflow-hidden shadow-card hover:shadow-card-hover hover:border-accent/40 hover:-translate-y-0.5 transition-all duration-300 flex flex-col">
      <div className="relative overflow-hidden aspect-[4/3] bg-surface">
        <img
          src={property.image}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <Badge className="absolute top-3 left-3 bg-card/95 backdrop-blur text-foreground border border-border/50 shadow-sm font-medium">
          {type}
        </Badge>
        <button
          type="button"
          onClick={() => setSaved((s) => !s)}
          aria-pressed={saved}
          aria-label={
            saved
              ? tx(`Remove ${title} from favorites`, `Αφαίρεση ${title} από τα αγαπημένα`)
              : tx(`Save ${title} to favorites`, `Αποθήκευση ${title} στα αγαπημένα`)
          }
          className="absolute top-3 right-3 h-9 w-9 inline-flex items-center justify-center rounded-full bg-card/95 backdrop-blur border border-border/50 shadow-sm text-foreground hover:text-accent hover:border-accent/50 transition-colors"
        >
          <Heart
            className={cn("h-4 w-4 transition-colors", saved && "fill-accent text-accent")}
            aria-hidden="true"
          />
        </button>
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
          <span className="text-lg font-bold text-white drop-shadow-md">{property.price}</span>
        </div>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-semibold text-foreground text-base leading-tight line-clamp-1 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <div className="mt-1.5 flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3 shrink-0" aria-hidden="true" />
          <span className="truncate">
            {location}, {region}
          </span>
        </div>

        <ul className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
          <li
            className="inline-flex items-center gap-1"
            aria-label={tx(`Interior size ${property.size}`, `Επιφάνεια ${property.size}`)}
          >
            <Maximize2 className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
            <span className="font-medium text-foreground">{property.size}</span>
          </li>
          <li
            className="inline-flex items-center gap-1"
            aria-label={`${property.bedrooms} ${bedLabel}`}
          >
            <BedDouble className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
            <span>
              <span className="font-medium text-foreground">{property.bedrooms}</span> {bedLabel}
            </span>
          </li>
          <li
            className="inline-flex items-center gap-1"
            aria-label={`${property.bathrooms} ${bathLabel}`}
          >
            <Bath className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
            <span>
              <span className="font-medium text-foreground">{property.bathrooms}</span> {bathLabel}
            </span>
          </li>
          <li
            className="inline-flex items-center gap-1"
            aria-label={tx(`Plot size ${property.plotSize}`, `Οικόπεδο ${property.plotSize}`)}
          >
            <LandPlot className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
            <span className="font-medium text-foreground">{property.plotSize}</span>
          </li>
        </ul>

        <div className="mt-auto pt-4 space-y-3">
          {property.agency && (() => {
            const ag = agencyByName(property.agency);
            const inner = (
              <>
                <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
                  {tx("Listed by", "Καταχώρηση από")}
                </span>
                <span className="text-xs font-semibold text-foreground truncate">
                  {property.agency}
                </span>
              </>
            );
            return ag ? (
              <Link
                to="/agencies/$slug"
                params={{ slug: ag.slug }}
                className="flex items-center justify-between gap-2 pt-3 border-t border-border/60 hover:text-accent transition-colors"
              >
                {inner}
              </Link>
            ) : (
              <div className="flex items-center justify-between gap-2 pt-3 border-t border-border/60">
                {inner}
              </div>
            );
          })()}
          <Button asChild variant="outline" size="sm" className="w-full">
            <Link to="/properties/$id" params={{ id: property.id }}>
              {tx("View Details", "Λεπτομέρειες")}
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
