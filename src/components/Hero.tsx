import Image from "next/image";
import banner from "@assets/banner.png";
import { DumbbellIcon } from "@/components/icons";

/**
 * Home page banner. The CTA is a plain anchor to `#library`, so it scrolls the
 * user down the same page instead of triggering a route change.
 */
export function Hero() {
  return (
    <section className="page-shell pt-6 sm:pt-8">
      <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-surface-soft via-surface to-ink px-6 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-32 size-[28rem] rounded-full bg-accent/[0.07] blur-3xl"
        />

        <div className="relative grid items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="animate-fade-up">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              WORKOUT LIBRARY
            </p>

            <h1 className="mt-4 max-w-2xl font-display text-4xl uppercase leading-[0.95] tracking-tight text-white sm:text-5xl lg:text-[3.75rem]">
              TRAIN WITH INTENT. LOG EVERY SET.
            </h1>

            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/60 sm:text-base">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
              into today&apos;s plan, and watch the week&apos;s work add up.
            </p>

            <a href="#library" className="btn-accent mt-8 uppercase tracking-wide">
              <DumbbellIcon className="size-4" />
              BROWSE WORKOUTS
            </a>
          </div>

          <div className="relative flex items-center justify-center">
            <Image
              src={banner}
              alt="Anatomical model training on a seated leg machine"
              priority
              sizes="(min-width: 1024px) 34rem, 20rem"
              className="h-auto w-full max-w-[18rem] drop-shadow-[0_30px_60px_rgba(0,0,0,0.65)] sm:max-w-[22rem] lg:max-w-[26rem]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
