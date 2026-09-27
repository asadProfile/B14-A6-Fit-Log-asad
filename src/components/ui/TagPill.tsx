import { cx } from "@/lib/utils";

/**
 * Lime category pill. Cards use the compact uppercase variant, the detail page
 * uses the roomier sentence-case one — both straight from the Figma design.
 */
export function TagPill({
  label,
  size = "sm",
  className,
}: {
  label: string;
  size?: "sm" | "md";
  className?: string;
}) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full bg-accent font-semibold text-black",
        size === "sm"
          ? "px-2.5 py-[3px] text-[10px] uppercase tracking-[0.08em]"
          : "px-4 py-1.5 text-sm",
        className,
      )}
    >
      {size === "sm" ? label.toUpperCase() : label}
    </span>
  );
}
