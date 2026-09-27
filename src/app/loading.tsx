import { CardGridSkeleton } from "@/components/ui/LoadingState";
import { Spinner } from "@/components/ui/Spinner";

/** Home-page loading animation, shown while the workout API responds. */
export default function HomeLoading() {
  return (
    <>
      <section className="page-shell pt-6 sm:pt-8">
        <div className="h-[22rem] animate-pulse-soft rounded-3xl border border-white/[0.08] bg-surface sm:h-[24rem]" />
      </section>

      <section className="page-shell py-14 sm:py-16 lg:py-20">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-3">
            <div className="h-9 w-56 animate-pulse-soft rounded-lg bg-white/[0.07]" />
            <div className="h-4 w-72 animate-pulse-soft rounded-lg bg-white/[0.05]" />
          </div>
          <div
            className="flex items-center gap-3 text-sm font-medium text-white/60"
            role="status"
            aria-live="polite"
          >
            <Spinner className="size-5" />
            Loading the library…
          </div>
        </div>

        <div className="mt-8">
          <CardGridSkeleton count={6} />
        </div>
      </section>
    </>
  );
}
