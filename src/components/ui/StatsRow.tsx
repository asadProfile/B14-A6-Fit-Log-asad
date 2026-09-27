import { ClockIcon, FlameIcon, StarIcon } from "@/components/icons";
import { formatCalories, formatDuration, formatNumber, cx } from "@/lib/utils";

type StatsRowProps = {
  duration: number;
  calories: number;
  rating: number;
  size?: "sm" | "md";
  className?: string;
};

/** Duration / calories / rating trio shown on every workout surface. */
export function StatsRow({
  duration,
  calories,
  rating,
  size = "sm",
  className,
}: StatsRowProps) {
  const iconClass = size === "sm" ? "size-4" : "size-5";
  const textClass = size === "sm" ? "text-xs sm:text-[13px]" : "text-sm";

  return (
    <div
      className={cx(
        "flex flex-wrap items-center gap-x-5 gap-y-2 text-white/60",
        textClass,
        className,
      )}
    >
      <span className="inline-flex items-center gap-1.5">
        <ClockIcon className={cx(iconClass, "text-white/40")} />
        {formatDuration(duration)}
      </span>
      <span className="inline-flex items-center gap-1.5">
        <FlameIcon className={cx(iconClass, "text-white/40")} />
        {formatCalories(calories)}
      </span>
      <span className="inline-flex items-center gap-1.5">
        <StarIcon className={cx(iconClass, "text-accent")} />
        {formatNumber(rating)}
      </span>
    </div>
  );
}
