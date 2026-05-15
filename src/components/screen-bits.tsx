import type { ComponentProps, ReactNode } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  PiArrowLeft,
  PiArrowRight,
  PiSealCheckFill,
  PiStarFill,
} from "react-icons/pi";
import type { TrustLink, TrustLinkStatus } from "@/lib/types";

/* ==================================================================
   Re-usable phone-screen primitives
   ================================================================== */

export function ScreenHeader({
  title,
  sub,
  back,
  rightSlot,
}: {
  title: string;
  sub?: string;
  /** when provided, used instead of router.history.back() */
  back?: string | (() => void);
  rightSlot?: ReactNode;
}) {
  const navigate = useNavigate();
  const onBack = () => {
    if (typeof back === "function") back();
    else if (typeof back === "string") navigate({ to: back });
    else window.history.back();
  };
  return (
    <div className="flex items-center justify-between border-b border-line px-5 py-3">
      <button onClick={onBack} className="text-ink-3 hover:text-ink">
        <PiArrowLeft size={18} />
      </button>
      <div className="text-center">
        <div
          className="font-display text-ink"
          style={{ fontSize: 15, fontWeight: 500 }}
        >
          {title}
        </div>
        {sub && (
          <div className="tiny-caps text-ink-3" style={{ fontSize: 9 }}>
            {sub}
          </div>
        )}
      </div>
      <div className="min-w-[44px] text-right text-ink-3">
        {rightSlot ?? (
          <span className="tiny-caps" style={{ fontSize: 9 }}>
            SLC
          </span>
        )}
      </div>
    </div>
  );
}

export function StatusTimeline({ active }: { active: number }) {
  const steps = [
    "Created",
    "Reviewed",
    "Paid",
    "Protected",
    "Dispatched",
    "Confirmed",
    "Released",
  ];
  return (
    <div className="flex items-center gap-1.5">
      {steps.map((s, i) => {
        const isActive = i <= active;
        return (
          <div key={s} className="flex flex-1 flex-col items-center gap-1">
            <div
              className="h-1 w-full rounded-full"
              style={{
                background: isActive
                  ? "var(--color-protected)"
                  : "var(--color-paper-3)",
              }}
            />
            <span
              className="tiny-caps"
              style={{
                fontSize: 7,
                color: isActive ? "var(--color-ink)" : "var(--color-ink-4)",
              }}
            >
              {s.slice(0, 4)}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export const STATUS_TO_INDEX: Record<TrustLinkStatus, number> = {
  draft: 0,
  pending_payment: 1,
  protected: 3,
  dispatched: 4,
  delivered: 5,
  released: 6,
  issue_open: 4,
  refunded: 6,
};

export function MoneyRow({
  label,
  amount,
  mute = false,
  bold = false,
}: {
  label: string;
  amount: string;
  mute?: boolean;
  bold?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between py-2.5 ${mute ? "text-ink-3" : "text-ink"}`}
    >
      <span className={bold ? "font-display text-base" : "text-sm"}>{label}</span>
      <span
        className={`numeric ${bold ? "font-display text-xl" : "font-mono text-sm"}`}
      >
        {amount}
      </span>
    </div>
  );
}

export function VerifiedPill({ children }: { children: ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full border border-protected/30 bg-protected-soft px-2 py-0.5 text-protected"
      style={{ fontSize: 10 }}
    >
      <PiSealCheckFill size={10} /> {children}
    </span>
  );
}

export function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-line bg-paper-2/30 px-4 py-3">
      <div className="tiny-caps text-ink-3">{label}</div>
      <div className="mt-1 text-base">{children}</div>
    </div>
  );
}

export function Stat({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub: ReactNode;
}) {
  return (
    <div>
      <div className="tiny-caps text-ink-3">{label}</div>
      <div
        className="font-display text-ink mt-1"
        style={{ fontSize: 26, lineHeight: 1 }}
      >
        {value}
      </div>
      <div className="tiny-caps text-ink-3 mt-1">{sub}</div>
    </div>
  );
}

export function ChoiceRow({
  tone = "ink",
  Icon,
  title,
  sub,
  onClick,
}: {
  tone?: "protected" | "clay" | "ink" | "ink-3";
  Icon: any;
  title: string;
  sub: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-start gap-3 rounded-2xl border bg-paper p-3 text-left transition hover:scale-[1.01] active:scale-[0.99]"
      style={{ borderColor: `var(--color-${tone})` }}
    >
      <Icon
        size={20}
        style={{ color: `var(--color-${tone})` }}
        className="mt-0.5 shrink-0"
      />
      <div className="flex-1">
        <div className="font-display text-ink" style={{ fontSize: 14 }}>
          {title}
        </div>
        <div className="tiny-caps text-ink-3 mt-0.5" style={{ fontSize: 9 }}>
          {sub}
        </div>
      </div>
      <PiArrowRight className="mt-1.5 text-ink-3" size={14} />
    </button>
  );
}

export function PrimaryButton({
  children,
  onClick,
  tone = "ink",
  size = "lg",
}: {
  children: ReactNode;
  onClick?: () => void;
  tone?: "ink" | "protected" | "clay";
  size?: "md" | "lg";
}) {
  const bg =
    tone === "protected"
      ? "bg-protected"
      : tone === "clay"
      ? "bg-clay"
      : "bg-ink";
  const pad =
    size === "lg" ? "px-7 py-4 text-base lg:text-lg" : "px-5 py-3 text-sm";
  return (
    <button
      onClick={onClick}
      className={`inline-flex w-full items-center justify-center gap-2 rounded-2xl ${bg} ${pad} text-paper transition active:scale-[0.99] lg:w-auto`}
    >
      <span className="font-display">{children}</span>
    </button>
  );
}

export function GhostButton({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-line bg-paper px-6 py-3 text-ink transition hover:bg-paper-2/40 lg:w-auto"
    >
      <span className="text-sm">{children}</span>
    </button>
  );
}

/* ==================================================================
   Link rendered as a button — for "click → setState → navigate"
   patterns. The Link does the navigation natively (real DOM href);
   onClick runs the side-effect. Avoids React Compiler memoization
   silently dropping a navigate() call after setState.
   ================================================================== */
// We loosen `params` from the strict per-route reducer to a plain record so
// these wrappers are usable as generic primitives.
type LinkAny = Omit<ComponentProps<typeof Link>, "params"> & {
  params?: Record<string, string>;
};

export function PrimaryLinkButton({
  children,
  tone = "ink",
  size = "lg",
  ...linkProps
}: LinkAny & {
  children: ReactNode;
  tone?: "ink" | "protected" | "clay";
  size?: "md" | "lg";
}) {
  const bg =
    tone === "protected"
      ? "bg-protected"
      : tone === "clay"
      ? "bg-clay"
      : "bg-ink";
  const pad =
    size === "lg" ? "px-7 py-4 text-base lg:text-lg" : "px-5 py-3 text-sm";
  return (
    <Link
      {...(linkProps as any)}
      className={`inline-flex w-full items-center justify-center gap-2 rounded-2xl ${bg} ${pad} text-paper transition active:scale-[0.99] lg:w-auto`}
    >
      <span className="font-display">{children}</span>
    </Link>
  );
}

export function GhostLinkButton({
  children,
  ...linkProps
}: LinkAny & { children: ReactNode }) {
  return (
    <Link
      {...(linkProps as any)}
      className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-line bg-paper px-6 py-3 text-ink transition hover:bg-paper-2/40 lg:w-auto"
    >
      <span className="text-sm">{children}</span>
    </Link>
  );
}

/* ==================================================================
   Avatars (deterministic from a hue)
   ================================================================== */
export function Avatar({
  hue,
  size = 48,
  initials,
}: {
  hue: number;
  size?: number;
  initials?: string;
}) {
  return (
    <div
      className="grid place-items-center rounded-full font-display"
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, hsl(${hue}, 70%, 56%), hsl(${(hue + 30) % 360}, 60%, 38%))`,
        color: "white",
        fontSize: size * 0.36,
        fontStyle: "italic",
        textShadow: "0 1px 2px rgba(0,0,0,0.2)",
      }}
    >
      {initials}
    </div>
  );
}

export function initialsOf(name: string) {
  return name
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("");
}

/* ==================================================================
   Trust Passport (compact card used by buyer-review screens)
   ================================================================== */
export function TrustPassport({ link }: { link: TrustLink }) {
  const s = link.seller;
  return (
    <div className="rounded-2xl border border-line bg-paper p-3">
      <div className="flex items-start gap-3">
        <div className="relative">
          <Avatar hue={s.avatarHue} size={48} initials={initialsOf(s.name)} />
          <div className="absolute -right-1 -bottom-1 rounded-full bg-paper p-0.5">
            <PiSealCheckFill className="text-protected" size={14} />
          </div>
        </div>
        <div className="flex-1">
          <div className="font-display text-ink" style={{ fontSize: 16 }}>
            {s.name}
          </div>
          <div className="tiny-caps text-ink-3" style={{ fontSize: 9 }}>
            {s.business} · {s.city}
          </div>
          <div className="mt-1 flex flex-wrap gap-1">
            {s.verifications.map((v) => (
              <VerifiedPill key={v}>{v}</VerifiedPill>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 border-t border-line pt-3 text-center">
        <Stat
          label="Trust Score"
          value={s.trustScore.toFixed(2)}
          sub={
            <span className="text-seal-deep flex items-center justify-center gap-0.5">
              <PiStarFill size={9} />/5
            </span>
          }
        />
        <Stat label="Sales" value={String(s.sales)} sub="completed" />
        <Stat
          label="Delivery"
          value={`${s.deliveryRate}%`}
          sub="on time"
        />
      </div>
    </div>
  );
}
