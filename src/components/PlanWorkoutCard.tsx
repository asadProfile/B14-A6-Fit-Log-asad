"use client";

import Link from "next/link";
import { CheckIcon, CloseIcon } from "@/components/icons";
import { StatsRow } from "@/components/ui/StatsRow";
import { WorkoutImage } from "@/components/ui/WorkoutImage";
import type { Workout } from "@/lib/types";
import { cx } from "@/lib/utils";

type PlanWorkoutCardProps = {
  workout: Workout;
  done: boolean;
  /** Saved rows have no "Mark as Done" action. */
  showDoneAction: boolean;
  onToggleDone: () => void;
  onRemove: () => void;
};

/** One row in the My Plan list, with its view / done / remove actions. */
export function PlanWorkoutCard({
  workout,
  done,
  showDoneAction,
  onToggleDone,
  onRemove,
}: PlanWorkoutCardProps) {
  return (
    <li
      className={cx(
        "flex flex-col gap-4 rounded-2xl border bg-surface p-4 transition sm:flex-row sm:items-center",
        done ? "border-accent/35 bg-accent/[0.03]" : "border-white/[0.09]",
      )}
    >
      <div className="aspect-[5/3] w-full shrink-0 overflow-hidden rounded-xl bg-white/[0.03] sm:aspect-[5/3] sm:w-40">
        <WorkoutImage
          src={workout.image}
          alt={`${workout.name} illustration`}
          className={cx("transition", done && "opacity-45 grayscale")}
        />
      </div>

      <div className="min-w-0 flex-1">
        <h3
          className={cx(
            "font-display text-xl uppercase leading-tight tracking-wide text-white",
            done && "line-through decoration-accent/70 decoration-2",
          )}
        >
          {workout.name}
        </h3>
        <p className="mt-1 text-sm text-white/45">{workout.equipment}</p>
        <StatsRow
          duration={workout.duration}
          calories={workout.caloriesBurned}
          rating={workout.rating}
          className="mt-3"
        />
      </div>

      <div className="flex items-center gap-2 sm:ml-2 sm:gap-3">
        <Link
          href={`/workouts/${workout.id}`}
          className="inline-flex flex-1 items-center justify-center whitespace-nowrap rounded-full border border-white/15 px-4 py-2.5 text-sm font-medium text-white transition hover:border-white/35 hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40 sm:flex-none sm:px-5"
        >
          View Details
        </Link>

        {showDoneAction ? (
          <button
            type="button"
            onClick={onToggleDone}
            aria-pressed={done}
            className={cx(
              "inline-flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:flex-none sm:px-5",
              done
                ? "border border-accent/60 bg-transparent text-accent hover:bg-accent/10 focus-visible:outline-accent"
                : "bg-accent text-black hover:bg-accent-strong focus-visible:outline-accent",
            )}
          >
            <CheckIcon className="size-4" />
            {done ? "Done" : "Mark as Done"}
          </button>
        ) : null}

        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${workout.name}`}
          title="Remove"
          className="grid size-10 shrink-0 place-items-center rounded-full text-white/45 transition hover:bg-white/5 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40"
        >
          <CloseIcon className="size-4" />
        </button>
      </div>
    </li>
  );
}
