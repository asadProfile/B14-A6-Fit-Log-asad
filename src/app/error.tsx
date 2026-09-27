"use client";

import Link from "next/link";
import { useEffect } from "react";
import { AlertIcon } from "@/components/icons";

/** Safety net for any unexpected runtime error in a route segment. */
export default function RouteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("FitLog route error:", error);
  }, [error]);

  return (
    <section className="page-shell flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
      <span className="grid size-12 place-items-center rounded-full bg-red-500/10 text-red-400">
        <AlertIcon className="size-6" />
      </span>
      <h1 className="mt-6 font-display text-3xl uppercase tracking-wide text-white sm:text-4xl">
        Something went wrong
      </h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-white/55">
        An unexpected error interrupted that rep. You can try again, or head back
        to the workout library.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button type="button" onClick={reset} className="btn-accent">
          Try again
        </button>
        <Link href="/" className="btn-outline">
          Back to workouts
        </Link>
      </div>
    </section>
  );
}
