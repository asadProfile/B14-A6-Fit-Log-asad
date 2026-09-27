import Link from "next/link";
import { DumbbellIcon } from "@/components/icons";

/** Dashed placeholder shown when a list has nothing to render. */
export function EmptyState({
  title,
  description,
  actionHref = "/",
  actionLabel = "Go to workouts",
}: {
  title: string;
  description: string;
  actionHref?: string;
  actionLabel?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-white/12 px-6 py-20 text-center">
      <span className="grid size-12 place-items-center rounded-full bg-accent/10 text-accent">
        <DumbbellIcon className="size-6" />
      </span>
      <h3 className="font-display text-2xl uppercase tracking-wide text-white sm:text-3xl">
        {title}
      </h3>
      <p className="max-w-md text-sm leading-relaxed text-white/55">{description}</p>
      <Link
        href={actionHref}
        className="mt-1 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-black transition hover:bg-accent-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        {actionLabel}
      </Link>
    </div>
  );
}
