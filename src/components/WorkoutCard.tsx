import Link from "next/link";
import { StatsRow } from "@/components/ui/StatsRow";
import { TagPill } from "@/components/ui/TagPill";
import { WorkoutImage } from "@/components/ui/WorkoutImage";
import type { Workout } from "@/lib/types";

/** Library tile: illustration, category tags, name, equipment and key stats. */
export function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link
      href={`/workouts/${workout.id}`}
      aria-label={`View ${workout.name} details`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-white/[0.09] bg-surface transition duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <div className="aspect-[3/2] w-full overflow-hidden bg-white/[0.03]">
        <WorkoutImage
          src={workout.image}
          alt={`${workout.name} illustration`}
          className="transition duration-500 group-hover:scale-[1.04]"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap gap-2">
          {workout.muscleGroups.map((group) => (
            <TagPill key={group} label={group} />
          ))}
        </div>

        <h3 className="mt-4 font-display text-xl uppercase leading-tight tracking-wide text-white">
          {workout.name}
        </h3>
        <p className="mt-1 text-sm text-white/45">{workout.equipment}</p>

        <StatsRow
          duration={workout.duration}
          calories={workout.caloriesBurned}
          rating={workout.rating}
          className="mt-5 border-t border-white/[0.07] pt-4"
        />
      </div>
    </Link>
  );
}
