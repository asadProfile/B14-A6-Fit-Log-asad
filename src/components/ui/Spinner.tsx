import { cx } from "@/lib/utils";

/** Lime ring spinner used by every loading state in the app. */
export function Spinner({ className }: { className?: string }) {
  return (
    <span
      className={cx(
        "inline-block animate-spin-slow rounded-full border-2 border-white/15 border-t-accent",
        className ?? "size-5",
      )}
      role="presentation"
    />
  );
}
