import { createFileRoute } from "@tanstack/react-router";
import { PiShieldCheckFill, PiPackageFill, PiClockFill } from "react-icons/pi";
import {
  ScreenStage,
  PageHeader,
  PageSplit,
  Card,
  ActionBar,
} from "@/components/ScreenStage";
import {
  MoneyRow,
  StatusTimeline,
  STATUS_TO_INDEX,
  PrimaryLinkButton,
  GhostLinkButton,
} from "@/components/screen-bits";
import { useLink } from "@/lib/store";
import { formatNaira, totalToProtect, settledToSeller } from "@/lib/types";

export const Route = createFileRoute("/t/$id/protected")({
  component: BuyerProtected,
});

function BuyerProtected() {
  const { id } = Route.useParams();
  const link = useLink(id);

  if (!link) return null;

  return (
    <ScreenStage>
      <PageHeader
        eyebrow="Step 05 · Buyer"
        title={
          <>
            Payment{" "}
            <em style={{ color: "var(--color-protected)", fontStyle: "italic" }}>
              protected.
            </em>{" "}
            Package on the way.
          </>
        }
        subtitle={
          <>
            Your{" "}
            <span className="font-mono numeric text-ink">
              {formatNaira(totalToProtect(link))}
            </span>{" "}
            is sitting in escrow with Flutterwave.{" "}
            {link.seller.name.split(" ")[0]} can't touch it until you confirm
            the package arrived in good shape.
          </>
        }
      />

      {/* Hero status */}
      <div className="mb-6 grid place-items-center rounded-3xl border border-protected/30 bg-protected-soft py-12 text-center">
        <div className="relative">
          <div className="absolute inset-0 rounded-full pulse-ring" />
          <div className="rounded-full bg-protected p-6 text-paper">
            <PiShieldCheckFill size={48} />
          </div>
        </div>
        <div className="mt-6 tiny-caps text-protected">
          Step 4 of 7 · Payment Protected
        </div>
        <div className="font-display mt-2 text-3xl text-ink lg:text-4xl">
          {formatNaira(totalToProtect(link))}{" "}
          <em
            className="text-protected"
            style={{ fontStyle: "italic" }}
          >
            held in escrow.
          </em>
        </div>
      </div>

      <PageSplit
        asideWidth="wide"
        aside={
          <div className="space-y-4">
            <Card>
              <div className="tiny-caps mb-2 text-ink-3">Funds breakdown</div>
              <MoneyRow
                label="Held in escrow"
                amount={formatNaira(totalToProtect(link))}
                bold
              />
              <MoneyRow
                label={`Goes to ${link.seller.name.split(" ")[0]} on confirmation`}
                amount={formatNaira(settledToSeller(link))}
                mute
              />
              <MoneyRow
                label="Auto-release timer"
                amount="48h after delivery proof"
                mute
              />
            </Card>

            <Card>
              <div className="flex items-start gap-3">
                <PiClockFill size={20} className="mt-0.5 text-clay shrink-0" />
                <div className="text-sm">
                  Package not as described? Tap{" "}
                  <span className="text-clay font-medium">Report an issue</span>{" "}
                  to freeze release and open the evidence room.
                </div>
              </div>
            </Card>
          </div>
        }
      >
        <Card>
          <div className="tiny-caps mb-4 text-ink-3">Lifecycle</div>
          <StatusTimeline active={STATUS_TO_INDEX[link.status]} />
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Step done label="TrustLink created" />
            <Step done label="Buyer reviewed" />
            <Step done label="Payment received" />
            <Step done label="Funds protected in escrow" />
            <Step
              current
              label={
                link.dispatch
                  ? `Shipping with ${link.dispatch.courier}`
                  : "Awaiting dispatch"
              }
            />
            <Step label="Buyer confirms receipt → release" />
          </div>

          {/* Demo prompt */}
          <div className="mt-6 rounded-2xl border border-line bg-paper-2/40 px-5 py-4">
            <div className="flex items-start gap-3">
              <PiPackageFill size={22} className="mt-0.5 text-ink-3 shrink-0" />
              <div className="flex-1">
                <div className="font-display text-base">
                  Demo shortcut — pretend the package just arrived
                </div>
                <div className="mt-1 text-sm text-ink-3">
                  Tap below to skip the wait and decide whether to release{" "}
                  {link.seller.name.split(" ")[0]}'s payment.
                </div>
              </div>
            </div>
          </div>
        </Card>
      </PageSplit>

      <ActionBar>
        <GhostLinkButton to="/t/$id/issue" params={{ id: link.id }}>
          Report an issue
        </GhostLinkButton>
        <PrimaryLinkButton
          tone="protected"
          to="/t/$id/confirm"
          params={{ id: link.id }}
        >
          Mark as received → confirm order →
        </PrimaryLinkButton>
      </ActionBar>
    </ScreenStage>
  );
}

function Step({
  label,
  done = false,
  current = false,
}: {
  label: string;
  done?: boolean;
  current?: boolean;
}) {
  const cls = done
    ? "border-protected/30 bg-protected-soft text-protected"
    : current
    ? "border-seal-deep/30 bg-seal-soft text-seal-deep"
    : "border-line bg-paper text-ink-3";
  const dot = done ? "bg-protected" : current ? "bg-seal-deep" : "bg-paper-3";
  return (
    <div className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm ${cls}`}>
      <span className={`h-2 w-2 rounded-full ${dot}`} />
      {label}
    </div>
  );
}
