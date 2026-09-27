import Image from "next/image";
import Link from "next/link";
import logo from "@assets/logo.png";
import { cx } from "@/lib/utils";

/** Logo + wordmark used in the navbar and the footer. */
export function BrandMark({
  className,
  wordmarkClassName,
  onClick,
}: {
  className?: string;
  wordmarkClassName?: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="FitLog home"
      className={cx("inline-flex items-center gap-2.5", className)}
    >
      <Image src={logo} alt="" width={26} height={26} priority className="size-6 sm:size-7" />
      <span
        className={cx(
          "font-display text-xl uppercase leading-none tracking-[0.04em] text-white sm:text-2xl",
          wordmarkClassName,
        )}
      >
        FitLog
      </span>
    </Link>
  );
}
