import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  PiPlusBold,
  PiArrowRight,
  PiPackageFill,
  PiShieldCheckFill,
  PiWarningOctagonFill,
  PiClockFill,
  PiSealCheckFill,
} from "react-icons/pi";
import { ScreenStage, PageHeader, PageSplit, Card } from "@/components/ScreenStage";
import {
  Avatar,
  initialsOf,
  Stat,
  VerifiedPill,
} from "@/components/screen-bits";
import { useStore } from "@/lib/store";
import {
  formatNaira,
  totalToProtect,
  type TrustLink,
  type TrustLinkStatus,
} from "@/lib/types";

export const Route = createFileRoute("/seller/")({
  component: SellerDashboard,
});

function SellerDashboard() {
  const { links } = useStore();
  const navigate = useNavigate();
  const list = Object.values(links);
  const seller = list[0]?.seller;

  return (
    <ScreenStage>
      <PageHeader
        back="/"
        eyebrow="Seller home"
        title={
          <>
            Welcome back,{" "}
            <em style={{ color: "var(--color-seal-deep)", fontStyle: "italic" }}>
              {seller?.name.split(" ")[0] ?? "Lara"}.
            </em>
          </>
        }
        subtitle="Create a TrustLink, share it on WhatsApp, watch the buyer's payment land in escrow. Buyers never get your account number — only the link."
        rightSlot={
          <button
            onClick={() => navigate({ to: "/seller/create" })}
            className="hidden items-center gap-2 rounded-full bg-ink px-5 py-3 text-paper transition hover:bg-ink-2 lg:inline-flex"
          >
            <PiPlusBold size={14} />
            <span className="font-display text-sm">New TrustLink</span>
          </button>
        }
      />

      <PageSplit
        aside={
          seller ? (
            <Card>
              <div className="flex items-center gap-4">
                <Avatar hue={seller.avatarHue} size={56} initials={initialsOf(seller.name)} />
                <div>
                  <div className="font-display text-lg">{seller.business}</div>
                  <div className="tiny-caps text-ink-3">
                    {seller.city} · Verified
                  </div>
                </div>
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {seller.verifications.map((v) => (
                  <VerifiedPill key={v}>{v}</VerifiedPill>
                ))}
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3 border-t border-line pt-5">
                <Stat label="Trust" value={seller.trustScore.toFixed(2)} sub="/5" />
                <Stat label="Sales" value={String(seller.sales)} sub="closed" />
                <Stat label="Delivery" value={`${seller.deliveryRate}%`} sub="on time" />
              </div>
            </Card>
          ) : null
        }
      >
        {/* Mobile-only "Create" CTA */}
        <button
          onClick={() => navigate({ to: "/seller/create" })}
          className="mb-6 flex w-full items-center justify-between rounded-2xl bg-ink px-5 py-4 text-paper transition active:scale-[0.99] lg:hidden"
        >
          <span className="flex items-center gap-2">
            <PiPlusBold size={16} />
            <span className="font-display text-base">Create new TrustLink</span>
          </span>
          <PiArrowRight />
        </button>

        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="font-display text-xl">Your TrustLinks</h2>
          <span className="tiny-caps text-ink-3">{list.length} total</span>
        </div>

        {list.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-line p-10 text-center text-sm text-ink-3">
            No TrustLinks yet — create one to get started.
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-line bg-paper">
            {/* Table header — desktop only */}
            <div className="hidden border-b border-line px-5 py-3 lg:grid lg:grid-cols-[2fr_1fr_1fr_140px] lg:gap-4 lg:items-center">
              <div className="tiny-caps text-ink-3">Product</div>
              <div className="tiny-caps text-ink-3">TrustLink</div>
              <div className="tiny-caps text-ink-3 text-right">Amount</div>
              <div className="tiny-caps text-ink-3 text-right">Status</div>
            </div>
            {list.map((l, i) => (
              <LinkRow key={l.id} link={l} isLast={i === list.length - 1} />
            ))}
          </div>
        )}
      </PageSplit>
    </ScreenStage>
  );
}

function LinkRow({ link, isLast }: { link: TrustLink; isLast: boolean }) {
  const target =
    link.status === "draft" ? "/seller/create" : `/seller/txn/${link.id}`;
  return (
    <Link
      to={target}
      className={`grid items-center gap-3 px-5 py-4 transition hover:bg-paper-2/30 ${!isLast ? "border-b border-line" : ""} grid-cols-[40px_1fr_auto] lg:grid-cols-[2fr_1fr_1fr_140px] lg:gap-4`}
    >
      <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-ink/70 to-ink-2 lg:hidden" />
      <div className="hidden lg:block">
        <div className="font-display text-base text-ink truncate">
          {link.product.name}
        </div>
        <div className="tiny-caps text-ink-3 mt-0.5">
          {link.product.subtitle}
        </div>
      </div>
      <div className="lg:hidden min-w-0">
        <div className="font-display text-sm text-ink truncate">
          {link.product.name}
        </div>
        <div className="tiny-caps text-ink-3">{link.id}</div>
      </div>
      <div className="hidden font-mono text-sm text-ink-3 lg:block">
        {link.id}
      </div>
      <div className="hidden font-mono numeric text-right text-sm text-ink lg:block">
        {formatNaira(totalToProtect(link))}
      </div>
      <StatusBadge status={link.status} />
    </Link>
  );
}

function StatusBadge({ status }: { status: TrustLinkStatus }) {
  const map: Record<
    TrustLinkStatus,
    { label: string; tone: string; Icon: any }
  > = {
    draft: { label: "Draft", tone: "ink-3", Icon: PiPackageFill },
    pending_payment: { label: "Awaiting pay", tone: "seal-deep", Icon: PiClockFill },
    protected: { label: "Protected", tone: "protected", Icon: PiShieldCheckFill },
    dispatched: { label: "Dispatched", tone: "protected", Icon: PiPackageFill },
    delivered: { label: "Delivered", tone: "protected", Icon: PiShieldCheckFill },
    released: { label: "Released", tone: "protected", Icon: PiSealCheckFill },
    issue_open: { label: "Issue", tone: "clay", Icon: PiWarningOctagonFill },
    refunded: { label: "Refunded", tone: "clay", Icon: PiWarningOctagonFill },
  };
  const { label, tone, Icon } = map[status];
  const bg =
    tone === "ink-3"
      ? "bg-paper-2"
      : tone === "seal-deep"
      ? "bg-seal-soft"
      : `bg-${tone}-soft`;
  return (
    <span
      className={`inline-flex items-center justify-self-end gap-1 rounded-full px-2.5 py-1 text-xs ${bg}`}
      style={{ color: `var(--color-${tone})` }}
    >
      <Icon size={11} />
      {label}
    </span>
  );
}
