import type { ReactNode } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { PiArrowLeft } from "react-icons/pi";

/**
 * Thin page wrapper — just provides a max-width container and padding.
 * Each route owns its own internal layout.
 */
export function ScreenStage({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-6xl px-3 pt-5 pb-16 sm:px-5 sm:pt-6 lg:px-10 lg:pt-10 lg:pb-24">
      {children}
    </div>
  );
}

/**
 * Page header used at the top of every flow route. Gives each screen a
 * back arrow, an eyebrow tag (step + actor), a serif title, and an
 * optional supporting paragraph.
 */
export function PageHeader({
  back,
  eyebrow,
  title,
  subtitle,
  rightSlot,
}: {
  back?: string;
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  rightSlot?: ReactNode;
}) {
  const navigate = useNavigate();
  return (
    <header className="mb-6 flex items-start justify-between gap-3 sm:mb-8 sm:gap-4 lg:mb-12">
      <div className="flex flex-1 items-start gap-3 lg:gap-5">
        {back !== undefined && (
          <button
            onClick={() => (back ? navigate({ to: back }) : window.history.back())}
            className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line text-ink-3 transition hover:bg-paper-2 hover:text-ink sm:h-9 sm:w-9 lg:h-10 lg:w-10"
            aria-label="Back"
          >
            <PiArrowLeft size={15} />
          </button>
        )}
        <div className="flex-1 min-w-0">
          {eyebrow && (
            <div className="tiny-caps mb-1.5 text-protected sm:mb-2">{eyebrow}</div>
          )}
          <h1
            className="font-display text-ink"
            style={{
              fontSize: "clamp(24px, 5vw, 56px)",
              lineHeight: 1.04,
              letterSpacing: "-0.025em",
              fontVariationSettings: '"opsz" 144, "SOFT" 60, "wght" 420',
            }}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              className="mt-2 max-w-2xl text-ink-3 text-sm sm:mt-3 sm:text-base"
              style={{ lineHeight: 1.55 }}
            >
              {subtitle}
            </p>
          )}
        </div>
      </div>
      {rightSlot && <div className="hidden shrink-0 sm:block">{rightSlot}</div>}
    </header>
  );
}

/**
 * A standard split layout: main content area with an optional aside.
 * Stacks on mobile; aside sits on the right on lg+.
 */
export function PageSplit({
  children,
  aside,
  asideWidth = "narrow",
}: {
  children: ReactNode;
  aside?: ReactNode;
  asideWidth?: "narrow" | "wide";
}) {
  const cols =
    asideWidth === "wide"
      ? "lg:grid-cols-[1fr_1fr]"
      : "lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]";
  return (
    <div className={`grid gap-8 ${aside ? cols : ""}`}>
      <div className="min-w-0">{children}</div>
      {aside && <aside className="min-w-0">{aside}</aside>}
    </div>
  );
}

/**
 * Standard card surface — paper sheet on cream/ink.
 */
export function Card({
  children,
  className = "",
  tone = "paper",
}: {
  children: ReactNode;
  className?: string;
  tone?: "paper" | "ink" | "protected" | "clay";
}) {
  const toneCls =
    tone === "ink"
      ? "bg-ink text-paper border-ink"
      : tone === "protected"
      ? "bg-protected-soft border-protected/30 text-protected"
      : tone === "clay"
      ? "bg-clay-soft border-clay/30 text-clay"
      : "paper";
  return (
    <div className={`rounded-2xl border p-4 sm:p-5 lg:p-6 ${toneCls} ${className}`}>
      {children}
    </div>
  );
}

/**
 * Action bar — sits at the bottom of a page. Buttons full-width on
 * mobile, inline on desktop.
 */
export function ActionBar({ children }: { children: ReactNode }) {
  return (
    <div className="mt-8 flex flex-col gap-3 sm:mt-10 lg:mt-12 lg:flex-row lg:items-center lg:justify-end">
      {children}
    </div>
  );
}

/**
 * A back link rendered in line, e.g. "← Back to dashboard".
 */
export function BackLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link
      to={to}
      className="tiny-caps inline-flex items-center gap-1 text-ink-3 hover:text-ink"
    >
      <PiArrowLeft size={11} /> {children}
    </Link>
  );
}
