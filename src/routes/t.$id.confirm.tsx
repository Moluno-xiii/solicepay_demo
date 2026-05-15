import { createFileRoute, Link } from "@tanstack/react-router";
import {
  PiCheckCircleFill,
  PiWarningOctagonFill,
  PiXCircleFill,
  PiArrowRight,
} from "react-icons/pi";
import {
  ScreenStage,
  PageHeader,
  Card,
} from "@/components/ScreenStage";
import { useLink, useStore } from "@/lib/store";
import { formatNaira, settledToSeller, totalToProtect } from "@/lib/types";

export const Route = createFileRoute("/t/$id/confirm")({
  component: BuyerConfirm,
});

function BuyerConfirm() {
  const { id } = Route.useParams();
  const link = useLink(id);
  const { advance } = useStore();

  if (!link) return null;

  const sellerFirst = link.seller.name.split(" ")[0];

  return (
    <ScreenStage>
      <PageHeader
        back={`/t/${link.id}/protected`}
        eyebrow="Step 07 · Buyer"
        title={
          <>
            Did you get what{" "}
            <em style={{ color: "var(--color-seal-deep)", fontStyle: "italic" }}>
              you paid for?
            </em>
          </>
        }
        subtitle={
          <>
            Your answer decides whether {sellerFirst} gets paid. Confirm and{" "}
            {sellerFirst} receives{" "}
            <span className="font-mono numeric text-ink">
              {formatNaira(settledToSeller(link))}
            </span>{" "}
            instantly. Report a problem and the{" "}
            <span className="font-mono numeric text-ink">
              {formatNaira(totalToProtect(link))}
            </span>{" "}
            stays in escrow until it's resolved.
          </>
        }
      />

      {/* Order strip */}
      <Card className="mb-6">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-ink/70 to-ink-2" />
          <div className="flex-1">
            <div className="font-display text-lg">{link.product.name}</div>
            <div className="tiny-caps text-ink-3 mt-1">
              Marked delivered ·{" "}
              {link.dispatch?.eta ?? "today"}
            </div>
          </div>
          <div className="hidden text-right lg:block">
            <div className="tiny-caps text-ink-3">Auto-release timer</div>
            <div className="font-mono text-base text-ink">47:42:18</div>
          </div>
        </div>
      </Card>

      {/* Three big choice cards — each is a Link */}
      <div className="grid gap-4 lg:grid-cols-3">
        <ChoiceLink
          tone="protected"
          Icon={PiCheckCircleFill}
          title="Yes — all good"
          consequence={
            <>
              Release{" "}
              <span className="font-mono numeric">
                {formatNaira(settledToSeller(link))}
              </span>{" "}
              to {sellerFirst} now. Funds settle in minutes.
            </>
          }
          to="/t/$id/receipt"
          params={{ id: link.id }}
          onClick={() => advance(link.id, "released")}
          ctaText={`Pay ${sellerFirst}`}
        />
        <ChoiceLink
          tone="clay"
          Icon={PiWarningOctagonFill}
          title="No — there's an issue"
          consequence={
            <>
              {sellerFirst} gets <strong>nothing</strong> until resolved.
              Funds frozen, evidence room opens.
            </>
          }
          to="/t/$id/issue"
          params={{ id: link.id }}
          ctaText="Open dispute"
        />
        <ChoiceLink
          tone="ink-3"
          Icon={PiXCircleFill}
          title="Never received"
          consequence={
            <>
              Notify {sellerFirst} and the courier. Refund if delivery proof
              fails.
            </>
          }
          to="/t/$id/issue"
          params={{ id: link.id }}
          ctaText="Notify courier"
        />
      </div>

      <div className="mt-6 rounded-2xl bg-paper-2/40 px-5 py-4 text-sm text-ink-3 lg:hidden">
        <div className="tiny-caps text-ink-3">Auto-release timer</div>
        <div className="mt-1 flex items-center justify-between">
          <span className="font-mono text-base text-ink">47:42:18</span>
          <span>If no action with valid delivery proof</span>
        </div>
      </div>
    </ScreenStage>
  );
}

function ChoiceLink({
  tone,
  Icon,
  title,
  consequence,
  ctaText,
  to,
  params,
  onClick,
}: {
  tone: "protected" | "clay" | "ink-3";
  Icon: any;
  title: string;
  consequence: React.ReactNode;
  ctaText: string;
  to: string;
  params: Record<string, string>;
  onClick?: () => void;
}) {
  const bg =
    tone === "protected"
      ? "var(--color-protected-soft)"
      : tone === "clay"
      ? "var(--color-clay-soft)"
      : "var(--color-paper-2)";
  return (
    <Link
      to={to as any}
      params={params as any}
      onClick={onClick}
      className="group flex h-full flex-col items-start gap-4 rounded-2xl border bg-paper p-6 text-left transition hover:scale-[1.01] hover:shadow-paper active:scale-[0.99]"
      style={{ borderColor: `var(--color-${tone})` }}
    >
      <div
        className="grid h-12 w-12 place-items-center rounded-full"
        style={{ background: bg, color: `var(--color-${tone})` }}
      >
        <Icon size={24} />
      </div>
      <div className="flex-1">
        <div className="font-display text-xl text-ink">{title}</div>
        <div className="mt-2 text-sm text-ink-2 leading-relaxed">
          {consequence}
        </div>
      </div>
      <div
        className="flex items-center gap-1.5 tiny-caps transition group-hover:gap-3"
        style={{ color: `var(--color-${tone})` }}
      >
        {ctaText} <PiArrowRight size={12} />
      </div>
    </Link>
  );
}
