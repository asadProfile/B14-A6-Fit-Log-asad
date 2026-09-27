import { Spinner } from "@/components/ui/Spinner";

/** Detail-page skeleton, streamed while the single workout is fetched. */
export default function WorkoutLoading() {
  return (
    <section className="page-shell py-8 sm:py-10 lg:py-14">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="aspect-[4/3] animate-pulse-soft rounded-3xl border border-white/[0.08] bg-surface sm:aspect-[16/11] lg:aspect-[4/5]" />

        <div className="space-y-5">
          <div className="h-10 w-3/4 animate-pulse-soft rounded-lg bg-white/[0.07]" />
          <div className="h-4 w-full animate-pulse-soft rounded-lg bg-white/[0.05]" />
          <div className="h-4 w-5/6 animate-pulse-soft rounded-lg bg-white/[0.05]" />

          <div className="flex gap-2 pt-1">
            <div className="h-8 w-20 animate-pulse-soft rounded-full bg-white/[0.07]" />
            <div className="h-8 w-20 animate-pulse-soft rounded-full bg-white/[0.07]" />
          </div>

          <div className="h-80 animate-pulse-soft rounded-2xl border border-white/[0.08] bg-surface" />

          <div
            className="flex items-center gap-3 pt-2 text-sm font-medium text-white/60"
            role="status"
            aria-live="polite"
          >
            <Spinner className="size-5" />
            Loading workout…
          </div>
        </div>
      </div>
    </section>
  );
}
