"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { AlertIcon } from "@/components/icons";
import { Spinner } from "./Spinner";

/** Shown when the workout API cannot be reached, with a way to try again. */
export function ErrorState({
  title = "Couldn't load the library",
  description = "The workout API did not respond. Check your connection and try again.",
}: {
  title?: string;
  description?: string;
}) {
  const router = useRouter();
  const [isRetrying, startRetry] = useTransition();

  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-red-500/25 bg-red-500/[0.04] px-6 py-16 text-center"
    >
      <span className="grid size-12 place-items-center rounded-full bg-red-500/10 text-red-400">
        <AlertIcon className="size-6" />
      </span>
      <h3 className="font-display text-2xl uppercase tracking-wide text-white">{title}</h3>
      <p className="max-w-md text-sm leading-relaxed text-white/55">{description}</p>
      <button
        type="button"
        disabled={isRetrying}
        onClick={() => startRetry(() => router.refresh())}
        className="btn-accent mt-1"
      >
        {isRetrying ? <Spinner className="size-4 border-black/25 border-t-black" /> : null}
        {isRetrying ? "Retrying…" : "Try again"}
      </button>
    </div>
  );
}
