import { MapPin, BadgeCheck, Star } from "lucide-react";
import { LocaleLink as Link, useTx } from "@/i18n/locale";
import { Button } from "@/components/ui/button";

export interface ProfessionalReview {
  author: string;
  rating: number;
  date: string;
  comment: string;
}

export interface ProfessionalDataTranslations {
  profession?: string;
  location?: string;
  bio?: string;
  headline?: string;
  about?: string;
}

export interface ProfessionalData {
  id: string;
  name: string;
  photo: string;
  profession: string;
  location: string;
  bio: string;
  verified: boolean;
  rating: number;
  reviewCount: number;
  headline?: string;
  about?: string;
  languages?: string[];
  specialties?: string[];
  yearsExperience?: number;
  serviceAreas?: string[];
  email?: string;
  phone?: string;
  website?: string;
  licenseNumber?: string;
  credentials?: string[];
  reviews?: ProfessionalReview[];
  el?: ProfessionalDataTranslations;
}

export function ProfessionalCard({ professional }: { professional: ProfessionalData }) {
  const tx = useTx();
  const profession = tx(professional.profession, professional.el?.profession ?? professional.profession);
  const location = tx(professional.location, professional.el?.location ?? professional.location);
  const bio = tx(professional.bio, professional.el?.bio ?? professional.bio);
  return (
    <article className="group bg-card rounded-2xl border border-border shadow-card hover:shadow-card-hover hover:border-accent/40 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden flex flex-col">
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-start gap-4">
          <div className="relative shrink-0">
            <img
              src={professional.photo}
              alt={`Portrait of ${professional.name}`}
              loading="lazy"
              className="w-16 h-16 rounded-full object-cover ring-2 ring-surface"
            />
            {professional.verified && (
              <span
                className="absolute -bottom-1 -right-1 bg-card rounded-full p-0.5 shadow-sm"
                aria-label="Verified professional"
              >
                <BadgeCheck className="h-4 w-4 text-accent fill-accent/20" />
              </span>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-foreground text-base leading-tight truncate group-hover:text-primary transition-colors">
              {professional.name}
            </h3>
            <p className="mt-1 text-[10px] font-bold tracking-[0.12em] uppercase text-accent">
              {profession}
            </p>
            <div className="mt-1.5 flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3 shrink-0" aria-hidden="true" />
              <span className="truncate">{location}</span>
            </div>
          </div>
        </div>

        <p className="mt-4 text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {bio}
        </p>
      </div>

      <div className="px-6 py-4 border-t border-border/60 bg-surface/40 flex items-center justify-between gap-3">
        <div className="flex items-center gap-1.5">
          <Star className="h-3.5 w-3.5 fill-accent text-accent" aria-hidden="true" />
          <span className="text-sm font-semibold text-foreground">{professional.rating}</span>
          <span className="text-xs text-muted-foreground">({professional.reviewCount})</span>
        </div>
        <div className="flex gap-2">
          <Button asChild size="sm" variant="outline" className="h-9">
            <Link to="/professionals/$id" params={{ id: professional.id }}>
              {tx("Profile", "Προφίλ")}
            </Link>
          </Button>
          <Button size="sm" className="h-9 bg-primary text-primary-foreground hover:bg-primary/90">
            {tx("Contact", "Επικοινωνία")}
          </Button>
        </div>
      </div>
    </article>
  );
}
