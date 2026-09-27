"use client";

import { ChevronDownIcon } from "@/components/icons";
import type { SortKey } from "@/lib/types";
import { SORT_OPTIONS } from "@/lib/utils";

/** "Sort By" dropdown — re-sorts whichever list it is attached to. */
export function SortSelect({
  value,
  onChange,
  className,
}: {
  value: SortKey;
  onChange: (value: SortKey) => void;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="flex items-center gap-3">
        <span className="hidden text-sm text-white/50 sm:inline">Sort By</span>
        <div className="relative">
          <select
            aria-label="Sort By"
            value={value}
            onChange={(event) => onChange(event.target.value as SortKey)}
            className="h-11 w-full cursor-pointer appearance-none rounded-xl border border-white/10 bg-surface pl-4 pr-10 text-sm font-medium text-white transition hover:border-white/20 focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/20"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value} className="bg-surface">
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDownIcon className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-white/50" />
        </div>
      </div>
    </div>
  );
}
