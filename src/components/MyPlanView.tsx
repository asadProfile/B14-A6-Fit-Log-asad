"use client";

import { useEffect, useMemo, useState } from "react";
import { PlanWorkoutCard } from "@/components/PlanWorkoutCard";
import { DumbbellIcon } from "@/components/icons";
import { EmptyState } from "@/components/ui/EmptyState";
import { LoadingState } from "@/components/ui/LoadingState";
import { SearchInput } from "@/components/ui/SearchInput";
import { SortSelect } from "@/components/ui/SortSelect";
import { useFitLog } from "@/context/FitLogContext";
import { getWorkoutSafe } from "@/lib/api";
import type { PlanTab, SortKey, Workout } from "@/lib/types";
import { cx, matchesQuery, sortWorkouts, sumBy } from "@/lib/utils";

const TABS: { value: PlanTab; label: string }[] = [
  { value: "plan", label: "Today's Plan" },
  { value: "saved", label: "Saved" },
];

function Metric({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: number;
  accent?: boolean;
}) {
  return (
    <div className="px-6 py-6 sm:px-8 sm:py-7">
      <p className="text-sm text-white/45">{label}</p>
      <p
        className={cx(
          "mt-2 font-display text-4xl leading-none tabular-nums sm:text-5xl",
          accent ? "text-accent" : "text-white",
        )}
      >
        {value}
      </p>
    </div>
  );
}

/** `/my-plan` — the log page: metrics, tabs, sorting, search and the list. */
export function MyPlanView() {
  const {
    plan,
    saved,
    hydrated,
    isDone,
    removeFromPlan,
    removeFromSaved,
    toggleDone,
  } = useFitLog();

  const [tab, setTab] = useState<PlanTab>("plan");
  const [sortKey, setSortKey] = useState<SortKey>("duration");
  const [query, setQuery] = useState("");
  const [live, setLive] = useState<Workout[] | null>(null);
  const [loading, setLoading] = useState(true);

  const items = tab === "plan" ? plan : saved;
  const idsKey = items.map((item) => item.id).join(",");

  // Refresh the stored rows against the API so durations/ratings stay current.
  useEffect(() => {
    if (!hydrated) return;

    if (!idsKey) {
      setLive(null);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    Promise.all(idsKey.split(",").map((id) => getWorkoutSafe(Number(id))))
      .then((results) => {
        if (cancelled) return;
        setLive(results.filter((result): result is Workout => result !== null));
        setLoading(false);
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [hydrated, idsKey]);

  // Stored data is the source of truth; fresh API data upgrades it when it lands.
  const list = useMemo(() => {
    const fresh = new Map((live ?? []).map((workout) => [workout.id, workout]));
    return items.map((item) => fresh.get(item.id) ?? item);
  }, [items, live]);

  const visible = useMemo(() => {
    const filtered = list.filter((workout) => matchesQuery(workout, query));
    return sortWorkouts(filtered, sortKey);
  }, [list, query, sortKey]);

  const metrics = {
    exercises: plan.length,
    minutes: sumBy(plan, (workout) => workout.duration),
    calories: sumBy(plan, (workout) => workout.caloriesBurned),
  };

  const isFirstLoad = !hydrated || loading;

  return (
    <section className="page-shell py-10 sm:py-12 lg:py-14">
      <header>
        <h1 className="font-display text-4xl uppercase tracking-wide text-white sm:text-5xl">
          MY PLAN
        </h1>
        <p className="mt-3 text-sm text-white/55 sm:text-base">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </header>

      <div className="mt-8 grid grid-cols-1 divide-y divide-white/[0.07] rounded-2xl border border-white/[0.08] bg-surface sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        <Metric label="Exercises" value={metrics.exercises} accent />
        <Metric label="Minutes" value={metrics.minutes} />
        <Metric label="Calories" value={metrics.calories} />
      </div>

      <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div
          role="tablist"
          aria-label="Plan lists"
          className="inline-flex w-full max-w-xs gap-1 rounded-xl border border-white/[0.09] bg-white/[0.03] p-1"
        >
          {TABS.map((item) => {
            const active = tab === item.value;
            return (
              <button
                key={item.value}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setTab(item.value)}
                className={cx(
                  "flex-1 whitespace-nowrap rounded-lg px-4 py-2.5 text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                  active
                    ? "border border-white/10 bg-white/[0.08] font-semibold text-white"
                    : "font-medium text-white/50 hover:text-white",
                )}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:justify-end">
          <SearchInput
            value={query}
            onChange={setQuery}
            placeholder="Search by lift or tag…"
            ariaLabel="Search your plan"
            className="sm:w-56"
          />
          <SortSelect value={sortKey} onChange={setSortKey} />
        </div>
      </div>

      <div className="mt-6">
        {isFirstLoad ? (
          <LoadingState message="Loading workouts…" />
        ) : list.length === 0 ? (
          <EmptyState
            title="Nothing here yet"
            description="Browse the library and add a lift to get today moving."
            actionHref="/"
            actionLabel="Go to workouts"
          />
        ) : visible.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-white/12 px-6 py-16 text-center">
            <DumbbellIcon className="size-7 text-white/30" />
            <p className="font-display text-xl uppercase tracking-wide text-white">
              No lifts match “{query}”
            </p>
            <p className="text-sm text-white/50">
              Try another name or tag, or clear the search field.
            </p>
            <button type="button" onClick={() => setQuery("")} className="btn-outline mt-1">
              Clear search
            </button>
          </div>
        ) : (
          <ul className="flex flex-col gap-4">
            {visible.map((workout) => (
              <PlanWorkoutCard
                key={workout.id}
                workout={workout}
                done={isDone(workout.id)}
                showDoneAction={tab === "plan"}
                onToggleDone={() => toggleDone(workout)}
                onRemove={() =>
                  tab === "plan" ? removeFromPlan(workout) : removeFromSaved(workout)
                }
              />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
