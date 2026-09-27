"use client";

import { useMemo, useState } from "react";
import { WorkoutCard } from "@/components/WorkoutCard";
import { SearchInput } from "@/components/ui/SearchInput";
import { DumbbellIcon } from "@/components/icons";
import type { Workout } from "@/lib/types";
import { matchesQuery } from "@/lib/utils";

/** "The Library" — every lift in the API, rendered as a responsive card grid. */
export function LibrarySection({ workouts }: { workouts: Workout[] }) {
  const [query, setQuery] = useState("");

  const visible = useMemo(
    () => workouts.filter((workout) => matchesQuery(workout, query)),
    [workouts, query],
  );

  return (
    <section id="library" className="page-shell scroll-mt-24 py-14 sm:py-16 lg:py-20">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-3xl uppercase tracking-wide text-white sm:text-4xl">
            THE LIBRARY
          </h2>
          <p className="mt-2 text-sm text-white/55">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder="Search lifts or tags…"
          ariaLabel="Search the workout library"
          className="sm:w-64"
        />
      </div>

      {visible.length > 0 ? (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      ) : (
        <div className="mt-8 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-white/12 px-6 py-16 text-center">
          <DumbbellIcon className="size-7 text-white/30" />
          <p className="font-display text-xl uppercase tracking-wide text-white">
            No lifts match “{query}”
          </p>
          <p className="text-sm text-white/50">
            Try a muscle group like “core”, a lift name, or clear the search.
          </p>
          <button
            type="button"
            onClick={() => setQuery("")}
            className="btn-outline mt-1"
          >
            Clear search
          </button>
        </div>
      )}
    </section>
  );
}
