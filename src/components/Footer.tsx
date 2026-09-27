import { BrandMark } from "@/components/ui/BrandMark";

/** Dark site footer — brand mark on the left, copyright on the right. */
export function Footer() {
  return (
    <footer className="border-t border-white/[0.07] bg-ink">
      <div className="mx-auto flex max-w-[1240px] flex-col items-center gap-4 px-4 py-7 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
        <BrandMark wordmarkClassName="text-lg sm:text-xl" />
        <p className="text-center text-xs text-white/45 sm:text-right sm:text-sm">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
