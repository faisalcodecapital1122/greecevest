import { useState } from "react";
import { Check, ChevronsUpDown, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { GREEK_REGIONS } from "@/data/greek-regions";
import { useLocale } from "@/i18n/locale";

type Props = {
  value: string;
  onChange: (value: string) => void;
  locale?: "en" | "el";
  className?: string;
};

export function RegionCombobox({ value, onChange, locale: localeProp, className }: Props) {
  const detected = useLocale();
  const locale = localeProp ?? detected;
  const [open, setOpen] = useState(false);

  const t = {
    all: locale === "el" ? "Όλες οι περιοχές" : "All Regions",
    placeholder: locale === "el" ? "Όλες οι περιοχές" : "All Regions",
    search: locale === "el" ? "Αναζήτηση περιοχής ή πόλης..." : "Search region or town...",
    empty: locale === "el" ? "Δεν βρέθηκαν αποτελέσματα." : "No results found.",
    allOf: (name: string) => (locale === "el" ? `Όλη η ${name}` : `All ${name}`),
  };

  const label = (() => {
    if (value === "all") return t.all;
    for (const g of GREEK_REGIONS) {
      const gName = locale === "el" ? g.el : g.en;
      if (g.value === value) return t.allOf(gName);
      const place = g.places.find((p) => p.value === value);
      if (place) return `${locale === "el" ? place.el : place.en}, ${gName}`;
    }
    return t.placeholder;
  })();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full sm:w-64 justify-between font-normal", className)}
        >
          <span className="flex items-center gap-2 truncate">
            <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
            <span className="truncate">{label}</span>
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] min-w-[260px] p-0" align="start">
        <Command>
          <CommandInput placeholder={t.search} />
          <CommandList className="max-h-80">
            <CommandEmpty>{t.empty}</CommandEmpty>
            <CommandItem
              value={t.all}
              onSelect={() => {
                onChange("all");
                setOpen(false);
              }}
            >
              <Check
                className={cn("mr-2 h-4 w-4", value === "all" ? "opacity-100" : "opacity-0")}
              />
              {t.all}
            </CommandItem>
            <CommandSeparator />
            {GREEK_REGIONS.map((group) => {
              const gName = locale === "el" ? group.el : group.en;
              return (
                <CommandGroup key={group.value} heading={gName}>
                  <CommandItem
                    value={`${t.allOf(gName)} ${group.en} ${group.el}`}
                    onSelect={() => {
                      onChange(group.value);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === group.value ? "opacity-100" : "opacity-0",
                      )}
                    />
                    <span className="font-medium">{t.allOf(gName)}</span>
                  </CommandItem>
                  {group.places.map((place) => {
                    const pName = locale === "el" ? place.el : place.en;
                    return (
                      <CommandItem
                        key={place.value}
                        value={`${place.en} ${place.el} ${gName}`}
                        onSelect={() => {
                          onChange(place.value);
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === place.value ? "opacity-100" : "opacity-0",
                          )}
                        />
                        <span className="pl-4">{pName}</span>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              );
            })}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
