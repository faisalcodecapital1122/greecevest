import { useState } from "react";
import {
  Scale,
  Ruler,
  Building2,
  HardHat,
  KeyRound,
  Wrench,
  Camera,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PROFESSION_GROUPS, type Profession } from "@/data/professions-taxonomy";
import { useLocale } from "@/i18n/locale";

const ICON_MAP: Record<string, LucideIcon> = {
  Scale,
  Ruler,
  Building2,
  HardHat,
  KeyRound,
  Wrench,
  Camera,
  Sparkles,
};

type Props = {
  locale?: "en" | "el";
  selected: string;
  onSelect: (value: string) => void;
  onGroupOpen?: (groupId: string) => void;
};

export function ProfessionTaxonomy({ locale: localeProp, selected, onSelect, onGroupOpen }: Props) {
  const detected = useLocale();
  const locale = localeProp ?? detected;
  // Only auto-open a group if the current selection belongs to one.
  // Otherwise keep the taxonomy compact (just the 8 tiles).
  const initialGroup =
    PROFESSION_GROUPS.find((g) => g.professions.some((p) => p.value === selected))?.id ?? null;
  const [openGroup, setOpenGroup] = useState<string | null>(initialGroup);

  const labels = {
    en: { browse: "Browse by category", spec: "Specializations", clear: "Clear" },
    el: { browse: "Περιήγηση ανά κατηγορία", spec: "Εξειδικεύσεις", clear: "Καθαρισμός" },
  }[locale];

  const activeGroup = PROFESSION_GROUPS.find((g) => g.id === openGroup);
  const selectedProf: Profession | undefined = PROFESSION_GROUPS.flatMap((g) => g.professions).find(
    (p) => p.value === selected,
  );

  // Strip "A. " / "Α. " letter prefix from group labels for cleaner display
  const cleanLabel = (s: string) => s.replace(/^[A-ZΑ-Ω]\.\s*/u, "");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
          {labels.browse}
        </h2>
        {selectedProf && (
          <button
            onClick={() => onSelect("all")}
            className="text-xs font-medium text-muted-foreground hover:text-foreground underline-offset-2 hover:underline"
          >
            {labels.clear}
          </button>
        )}
      </div>

      {/* Group icon tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {PROFESSION_GROUPS.map((group) => {
          const Icon = ICON_MAP[group.icon] ?? Sparkles;
          const isOpen = openGroup === group.id;
          const hasSelected = group.professions.some((p) => p.value === selected);
          const active = isOpen || hasSelected;
          return (
            <button
              key={group.id}
              onClick={() => {
                const next = isOpen ? null : group.id;
                setOpenGroup(next);
                if (next && onGroupOpen) onGroupOpen(next);
              }}
              aria-pressed={active}
              className={`group flex flex-col items-center justify-center gap-2.5 p-4 min-h-[104px] rounded-xl border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
                active
                  ? "bg-primary text-primary-foreground border-primary shadow-card"
                  : "bg-card border-border text-muted-foreground hover:border-accent/60 hover:text-foreground hover:shadow-card"
              }`}
            >
              <Icon
                className={`h-5 w-5 transition-colors ${active ? "" : "group-hover:text-accent"}`}
              />
              <span className="text-[11px] font-semibold text-center leading-tight">
                {cleanLabel(group[locale])}
              </span>
            </button>
          );
        })}
      </div>

      {/* Profession pills for the open group */}
      {activeGroup && (
        <div id="profession-pills" className="bg-card border border-border rounded-xl p-5 scroll-mt-48 sm:scroll-mt-40">
          <div className="flex flex-wrap gap-2">
            {activeGroup.professions.map((p) => {
              const isActive = p.value === selected;
              return (
                <button
                  key={p.value}
                  onClick={() => onSelect(isActive ? "all" : p.value)}
                  aria-pressed={isActive}
                  className={`px-3.5 py-1.5 rounded-full text-sm border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 ${
                    isActive
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-surface border-border text-muted-foreground hover:border-accent/60 hover:text-foreground"
                  }`}
                >
                  {p[locale]}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Selected profession detail with specializations */}
      {selectedProf && (
        <div className="bg-accent/5 border border-accent/30 rounded-xl p-5">
          <div className="flex items-baseline justify-between gap-3 mb-3 flex-wrap">
            <h3 className="text-lg font-semibold text-foreground">{selectedProf[locale]}</h3>
            <span className="text-xs uppercase tracking-wider text-accent font-semibold">
              {labels.spec}
            </span>
          </div>
          {selectedProf.description && (
            <p className="text-sm text-muted-foreground mb-4">{selectedProf.description[locale]}</p>
          )}
          <div className="flex flex-wrap gap-2">
            {selectedProf.specializations.map((s, i) => (
              <Badge key={i} variant="secondary" className="font-normal">
                {s[locale]}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
