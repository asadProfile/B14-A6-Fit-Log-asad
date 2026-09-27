"use client";

import { CloseIcon, SearchIcon } from "@/components/icons";

/** Filter box used on the library and on the My Plan page. */
export function SearchInput({
  value,
  onChange,
  placeholder = "Search lifts…",
  ariaLabel = "Search workouts",
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  ariaLabel?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="relative block">
        <span className="sr-only">{ariaLabel}</span>
        <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-white/40" />
        <input
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="h-11 w-full rounded-xl border border-white/10 bg-surface pl-10 pr-10 text-sm text-white placeholder:text-white/35 transition focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/20"
        />
        {value ? (
          <button
            type="button"
            onClick={() => onChange("")}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-white/40 transition hover:bg-white/10 hover:text-white"
          >
            <CloseIcon className="size-3.5" />
          </button>
        ) : null}
      </label>
    </div>
  );
}
