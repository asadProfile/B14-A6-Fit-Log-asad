import type { SortKey, Workout } from "./types";

/** `6` -> `"6"`, `1200` -> `"1,200"` */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

/** Human readable duration, e.g. `25 min`. */
export function formatDuration(minutes: number): string {
  return `${minutes} min`;
}

/** Human readable calories, e.g. `180 kcal`. */
export function formatCalories(kcal: number): string {
  return `${kcal} kcal`;
}

/** Cap of lifts allowed in Today's Plan. */
export const PLAN_LIMIT = 5;

export const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "duration", label: "Duration" },
  { value: "calories", label: "Calories" },
  { value: "rating", label: "Rating" },
];

const SORTERS: Record<SortKey, (a: Workout, b: Workout) => number> = {
  // Longest session first — the order the Figma design shows by default.
  duration: (a, b) => b.duration - a.duration,
  calories: (a, b) => b.caloriesBurned - a.caloriesBurned,
  rating: (a, b) => b.rating - a.rating,
};

/** Re-sort a list by one of the required sort keys. Never mutates the input. */
export function sortWorkouts(workouts: Workout[], key: SortKey): Workout[] {
  return [...workouts].sort(SORTERS[key]);
}

/** Match a workout on its name, muscle groups or equipment. */
export function matchesQuery(workout: Workout, query: string): boolean {
  const needle = query.trim().toLowerCase();
  if (!needle) return true;

  return (
    workout.name.toLowerCase().includes(needle) ||
    workout.equipment.toLowerCase().includes(needle) ||
    workout.muscleGroups.some((group) => group.toLowerCase().includes(needle))
  );
}

/** Sum a numeric field across a list of workouts. */
export function sumBy(workouts: Workout[], pick: (w: Workout) => number): number {
  return workouts.reduce((total, workout) => total + pick(workout), 0);
}

/** Merge class names, skipping falsy values. */
export function cx(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(" ");
}
