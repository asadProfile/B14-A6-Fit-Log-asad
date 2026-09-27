"use client";

import {
  AlertIcon,
  BookmarkIcon,
  CalendarPlusIcon,
  CheckIcon,
} from "@/components/icons";
import { TagPill } from "@/components/ui/TagPill";
import { WorkoutImage } from "@/components/ui/WorkoutImage";
import { useFitLog } from "@/context/FitLogContext";
import type { Workout } from "@/lib/types";
import { PLAN_LIMIT, formatCalories, formatDuration, formatNumber } from "@/lib/utils";

/** The two-column workout detail layout, with its plan/save actions. */
export function WorkoutDetailView({ workout }: { workout: Workout }) {
  const { addToPlan, saveForLater, isInPlan, isInSaved, planFull, hydrated } =
    useFitLog();

  // `hydrated` guards keep the buttons correct on the very first paint.
  const inPlan = hydrated && isInPlan(workout.id);
  const inSaved = hydrated && isInSaved(workout.id);
  const planIsFull = hydrated && planFull;

  const specs: { label: string; value: string }[] = [
    { label: "Equipment", value: workout.equipment },
    { label: "Difficulty", value: workout.difficulty },
    { label: "Sets", value: String(workout.sets) },
    { label: "Reps", value: String(workout.reps) },
    { label: "Duration", value: formatDuration(workout.duration) },
    { label: "Calories", value: formatCalories(workout.caloriesBurned) },
    { label: "Rating", value: formatNumber(Number(workout.rating)) },
  ];

  return (
    <section className="page-shell py-8 sm:py-10 lg:py-14">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="overflow-hidden rounded-3xl border border-white/[0.08] bg-surface">
          <WorkoutImage
            src={workout.image}
            alt={`${workout.name} illustration`}
            variant="detail"
            loading="eager"
            className="aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/5]"
          />
        </div>

        <div className="animate-fade-up">
          <h1 className="font-display text-3xl uppercase leading-[1.05] tracking-wide text-white sm:text-4xl lg:text-5xl">
            {workout.name}
          </h1>

          <p className="mt-4 text-sm leading-relaxed text-white/60 sm:text-base">
            {workout.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {workout.muscleGroups.map((group) => (
              <TagPill key={group} label={group} size="md" />
            ))}
          </div>

          <dl className="mt-8 divide-y divide-white/[0.07] overflow-hidden rounded-2xl border border-white/[0.08] bg-surface">
            {specs.map((spec) => (
              <div
                key={spec.label}
                className="flex items-center justify-between gap-6 px-5 py-3.5"
              >
                <dt className="text-xs font-medium uppercase tracking-[0.14em] text-white/45">
                  {spec.label}
                </dt>
                <dd className="text-right text-sm font-medium text-white/90">
                  {spec.value}
                </dd>
              </div>
            ))}
          </dl>

          <h2 className="mt-10 font-display text-xl uppercase tracking-[0.14em] text-white">
            Instructions
          </h2>
          <ol className="mt-5 space-y-4">
            {workout.instructions.map((step, index) => (
              <li key={step} className="flex gap-4 text-sm leading-relaxed text-white/70">
                <span className="shrink-0 tabular-nums text-white/35">{index + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => addToPlan(workout)}
              disabled={inPlan || planIsFull}
              className="btn-accent"
            >
              {inPlan ? (
                <CheckIcon className="size-4" />
              ) : planIsFull ? (
                <AlertIcon className="size-4" />
              ) : (
                <CalendarPlusIcon className="size-4" />
              )}
              {inPlan
                ? "In today's plan"
                : planIsFull
                  ? `Plan full (${PLAN_LIMIT}/${PLAN_LIMIT})`
                  : "Add to today's plan"}
            </button>

            <button
              type="button"
              onClick={() => saveForLater(workout)}
              disabled={inSaved}
              className="btn-outline"
            >
              {inSaved ? (
                <CheckIcon className="size-4 text-accent" />
              ) : (
                <BookmarkIcon className="size-4" />
              )}
              {inSaved ? "Saved" : "Save for later"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
