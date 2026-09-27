"use client";

import { useState } from "react";
import cardFallback from "@assets/card-image.jpg";
import detailsFallback from "@assets/details-image.png";
import { cx } from "@/lib/utils";

type WorkoutImageProps = {
  src: string;
  alt: string;
  /** Which bundled illustration to fall back to when the remote image fails. */
  variant?: "card" | "detail";
  className?: string;
  loading?: "lazy" | "eager";
};

/**
 * Remote workout illustration with a bundled local fallback, so a slow or
 * broken image host never leaves an empty hole in the layout.
 */
export function WorkoutImage({
  src,
  alt,
  variant = "card",
  className,
  loading = "lazy",
}: WorkoutImageProps) {
  const [failed, setFailed] = useState(false);
  const fallback = variant === "detail" ? detailsFallback.src : cardFallback.src;

  return (
    // eslint-disable-next-line @next/next/no-img-element -- remote host is configurable at runtime
    <img
      src={failed ? fallback : src}
      alt={alt}
      loading={loading}
      decoding="async"
      onError={() => setFailed(true)}
      className={cx("h-full w-full object-cover", className)}
    />
  );
}
