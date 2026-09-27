import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WorkoutDetailView } from "@/components/WorkoutDetailView";
import { ErrorState } from "@/components/ui/ErrorState";
import { getWorkout } from "@/lib/api";

type WorkoutPageProps = {
  params: Promise<{ id: string }>;
};

/** Ids in the FitLog API are numeric — anything else can never resolve. */
const isValidId = (id: string) => /^\d+$/.test(id);

export async function generateMetadata({
  params,
}: WorkoutPageProps): Promise<Metadata> {
  const { id } = await params;
  if (!isValidId(id)) return { title: "Workout not found" };

  try {
    const workout = await getWorkout(id);
    if (!workout) return { title: "Workout not found" };
    return { title: workout.name, description: workout.description };
  } catch {
    return { title: "Workout details" };
  }
}

/** Detail page for a single lift, e.g. `/workouts/1`. */
export default async function WorkoutPage({ params }: WorkoutPageProps) {
  const { id } = await params;

  // Anything that is not a numeric id gets the 404 page, without a round trip.
  if (!isValidId(id)) notFound();

  let workout = null;
  let failed = false;

  try {
    workout = await getWorkout(id);
  } catch {
    failed = true;
  }

  if (failed) {
    return (
      <section className="page-shell py-14 sm:py-16 lg:py-20">
        <ErrorState
          title="Couldn't load this lift"
          description="The workout API did not respond. Check your connection and try again."
        />
      </section>
    );
  }

  if (!workout) notFound();

  return <WorkoutDetailView workout={workout} />;
}
