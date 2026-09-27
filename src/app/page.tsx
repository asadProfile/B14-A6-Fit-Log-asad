import { Hero } from "@/components/Hero";
import { LibrarySection } from "@/components/LibrarySection";
import { ErrorState } from "@/components/ui/ErrorState";
import { getWorkouts } from "@/lib/api";
import type { Workout } from "@/lib/types";

/** Home — hero banner plus the full workout library. */
export default async function HomePage() {
  let workouts: Workout[] = [];
  let failed = false;

  try {
    workouts = await getWorkouts();
  } catch {
    failed = true;
  }

  return (
    <>
      <Hero />

      {failed ? (
        <section className="page-shell py-14 sm:py-16 lg:py-20">
          <ErrorState />
        </section>
      ) : (
        <LibrarySection workouts={workouts} />
      )}
    </>
  );
}
