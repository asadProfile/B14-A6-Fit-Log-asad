import Link from "next/link";
import { ArrowDownIcon, DumbbellIcon } from "@/components/icons";

export const metadata = {
  title: "Page not found",
};

/** 404 — shown for every route FitLog does not know about. */
export default function NotFound() {
  return (
    <section className="page-shell flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
      <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-surface px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.28em] text-accent">
        <DumbbellIcon className="size-3.5" />
        Error 404
      </p>

      <h1 className="mt-8 font-display text-[5rem] uppercase leading-none tracking-tight text-white sm:text-[8rem]">
        404
      </h1>

      <h2 className="mt-2 font-display text-2xl uppercase tracking-wide text-white sm:text-3xl">
        This rep doesn&apos;t exist
      </h2>

      <p className="mt-4 max-w-md text-sm leading-relaxed text-white/55">
        The page you&apos;re looking for was moved, renamed, or never made it off
        the rack. Head back to the library and pick a lift.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/" className="btn-accent">
          <ArrowDownIcon className="size-4 rotate-[-90deg]" />
          Back to workouts
        </Link>
        <Link href="/my-plan" className="btn-outline">
          View my plan
        </Link>
      </div>
    </section>
  );
}
