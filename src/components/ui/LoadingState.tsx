import { Spinner } from "./Spinner";
import { cx } from "@/lib/utils";

/** Centered spinner + caption, used inside cards and page-level fallbacks. */
export function LoadingState({
  message = "Loading workouts…",
  className,
}: {
  message?: string;
  className?: string;
}) {
  return (
    <div
      className={cx(
        "flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-white/10 px-6 py-16 text-center",
        className,
      )}
      role="status"
      aria-live="polite"
    >
      <Spinner className="size-7" />
      <p className="text-sm font-medium text-white/60">{message}</p>
    </div>
  );
}

/** Skeleton grid shown while the library is still streaming in. */
export function CardGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-2xl border border-white/10 bg-surface"
        >
          <div className="aspect-[3/2] w-full animate-pulse-soft bg-white/[0.06]" />
          <div className="space-y-3 p-5">
            <div className="h-4 w-24 animate-pulse-soft rounded-full bg-white/[0.06]" />
            <div className="h-5 w-2/3 animate-pulse-soft rounded-full bg-white/[0.08]" />
            <div className="h-3 w-1/3 animate-pulse-soft rounded-full bg-white/[0.05]" />
            <div className="h-3 w-1/2 animate-pulse-soft rounded-full bg-white/[0.05]" />
          </div>
        </div>
      ))}
    </div>
  );
}
