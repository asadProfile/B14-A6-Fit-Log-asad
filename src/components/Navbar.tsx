"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CloseIcon, MenuIcon } from "@/components/icons";
import { BrandMark } from "@/components/ui/BrandMark";
import { useFitLog } from "@/context/FitLogContext";
import { cx } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Workouts" },
  { href: "/my-plan", label: "My Plan" },
] as const;

/** Pill shown around the link of the page you are currently on. */
function navLinkClass(active: boolean) {
  return cx(
    "rounded-full px-4 py-2 text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
    active
      ? "bg-accent-dim font-semibold text-accent ring-1 ring-inset ring-accent/25"
      : "font-medium text-white/60 hover:bg-white/5 hover:text-white",
  );
}

/** Filled lime counter used by the "Plan" badge. */
function PlanBadge({ count }: { count: number }) {
  return (
    <span className="grid size-7 min-w-7 place-items-center rounded-full bg-accent px-1 text-xs font-bold tabular-nums text-black">
      {count}
    </span>
  );
}

/** Outline-only counter used by the "Saved" badge. */
function SavedBadge({ count }: { count: number }) {
  return (
    <span className="grid size-7 min-w-7 place-items-center rounded-full border border-white/25 px-1 text-xs font-bold tabular-nums text-white">
      {count}
    </span>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = useFitLog();
  const [menuOpen, setMenuOpen] = useState(false);

  // Never leave the mobile sheet open behind a navigation.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/" || pathname.startsWith("/workouts")
      : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-ink/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1240px] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <BrandMark />

        <nav className="hidden flex-1 items-center justify-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={navLinkClass(isActive(link.href))}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          <Link
            href="/my-plan"
            className="inline-flex items-center gap-2 text-sm text-white/70 transition hover:text-white"
            aria-label={`Plan: ${plan.length} lifts`}
          >
            Plan
            <PlanBadge count={plan.length} />
          </Link>
          <Link
            href="/my-plan"
            className="inline-flex items-center gap-2 text-sm text-white/70 transition hover:text-white"
            aria-label={`Saved: ${saved.length} lifts`}
          >
            Saved
            <SavedBadge count={saved.length} />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="ml-auto rounded-lg border border-white/10 p-2 text-white transition hover:bg-white/5 md:hidden"
        >
          {menuOpen ? <CloseIcon className="size-5" /> : <MenuIcon className="size-5" />}
        </button>
      </div>

      {menuOpen ? (
        <div
          id="mobile-nav"
          className="border-t border-white/[0.07] bg-ink px-4 pb-5 pt-3 md:hidden"
        >
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={cx(
                  "rounded-xl px-4 py-3 text-base transition",
                  isActive(link.href)
                    ? "bg-accent-dim font-semibold text-accent"
                    : "font-medium text-white/70 hover:bg-white/5 hover:text-white",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-3 flex items-center gap-6 border-t border-white/[0.07] px-4 pt-4">
            <Link
              href="/my-plan"
              className="inline-flex items-center gap-2 text-sm text-white/70"
            >
              Plan
              <PlanBadge count={plan.length} />
            </Link>
            <Link
              href="/my-plan"
              className="inline-flex items-center gap-2 text-sm text-white/70"
            >
              Saved
              <SavedBadge count={saved.length} />
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
