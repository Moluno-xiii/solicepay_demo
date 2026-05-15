import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  PiPackageFill,
  PiShieldCheckFill,
  PiClockFill,
  PiSealCheckFill,
  PiWarningOctagonFill,
} from "react-icons/pi";
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
  PrimaryButton,
  GhostButton,
  Avatar,
  initialsOf,
} from "@/components/screen-bits";
import { useLink, useStore } from "@/lib/store";
import {
  formatNaira,
  platformFee,
  settledToSeller,
  totalToProtect,
} from "@/lib/types";

export const Route = createFileRoute("/seller/txn/$id/")({
  component: SellerTxn,
});

function SellerTxn() {
  const { id } = Route.useParams();
  const link = useLink(id);
  const navigate = useNavigate();
  const { advance } = useStore();

  if (!link) {
    return (
      <ScreenStage>
        <PageHeader title="TrustLink not found" back="/seller" />
      </ScreenStage>
    );
  }

  const isWaiting = link.status === "pending_payment";
  const canDispatch = link.status === "protected";
  const hasIssue = link.status === "issue_open";
  const isReleased = link.status === "released";

  const release = () => advance(link.id, "released");

  const headline = isWaiting
    ? "Waiting for buyer to pay"
    : canDispatch
    ? "Buyer paid · funds in escrow"
    : link.status === "dispatched"
    ? `${link.buyer.name.split(" ")[0]} will receive soon`
    : link.status === "delivered"
    ? "Awaiting buyer confirmation"
    : hasIssue
    ? `${link.buyer.name.split(" ")[0]} raised an issue`
    : isReleased
    ? "Funds settled to your bank"
    : "";

  return (
    <ScreenStage>
      <PageHeader
        back="/seller"
        eyebrow={`TrustLink · ${link.id}`}
        title={
          <>
            {link.product.name.split(" — ")[0]}{" "}
            <em
              style={{ color: "var(--color-seal-deep)", fontStyle: "italic" }}
              className="text-base lg:text-2xl"
            >
              · {headline.toLowerCase()}
            </em>
          </>
        }
        subtitle={`${link.product.subtitle} · ${formatNaira(totalToProtect(link))} held in escrow`}
      />

      {/* Timeline */}
      <Card className="mb-6">
        <div className="tiny-caps mb-4 text-ink-3">Lifecycle</div>
        <StatusTimeline active={STATUS_TO_INDEX[link.status]} />
      </Card>

      <PageSplit
        asideWidth="wide"
        aside={
          <div className="space-y-4">
            {/* Buyer card */}
            <Card>
              <div className="tiny-caps mb-3 text-ink-3">Buyer</div>
              <div className="flex items-center gap-3">
                <Avatar
                  hue={link.buyer.avatarHue}
                  size={48}
                  initials={initialsOf(link.buyer.name)}
                />
                <div className="flex-1">
                  <div className="font-display text-base">
                    {link.buyer.name}
                  </div>
                  <div className="tiny-caps text-ink-3">
                    {link.buyer.city} · Trust {link.buyer.trustScore.toFixed(2)}
                  </div>
                </div>
              </div>
            </Card>

            {/* Money */}
            <Card>
              <div className="tiny-caps mb-2 text-ink-3">Money</div>
              <MoneyRow
                label="Buyer paid"
                amount={formatNaira(totalToProtect(link))}
                mute
              />
              <MoneyRow
                label="Platform fee"
                amount={`-${formatNaira(platformFee(link))}`}
                mute
              />
              <div className="border-t border-line my-1" />
              <MoneyRow
                label={isReleased ? "Settled" : "You receive"}
                amount={formatNaira(settledToSeller(link))}
                bold
              />
            </Card>

            {link.dispatch && (
              <Card>
                <div className="tiny-caps mb-2 text-ink-3">Dispatch</div>
                <div className="flex items-center gap-2 text-sm">
                  <PiPackageFill size={16} className="text-protected" />
                  {link.dispatch.courier}
                </div>
                <div className="font-mono mt-1 text-sm">
                  {link.dispatch.tracking}
                </div>
                <div className="tiny-caps mt-1 text-ink-3">
                  Sent {link.dispatch.dispatchedAt} · ETA {link.dispatch.eta}
                </div>
              </Card>
            )}
          </div>
        }
      >
        {/* Hero status */}
        <Card className="mb-4">
          <div className="flex items-start gap-4">
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-protected text-paper">
              {isWaiting ? (
                <PiClockFill size={22} />
              ) : hasIssue ? (
                <PiWarningOctagonFill size={22} />
              ) : isReleased ? (
                <PiSealCheckFill size={22} />
              ) : (
                <PiShieldCheckFill size={22} />
              )}
            </div>
            <div className="flex-1">
              <div className="tiny-caps text-protected">Current status</div>
              <div className="font-display mt-1 text-2xl">{headline}</div>
              <div className="tiny-caps mt-2 text-ink-3">
                {formatNaira(totalToProtect(link))} held by Flutterwave escrow
              </div>
            </div>
          </div>
        </Card>

        {/* Issue panel */}
        {hasIssue && link.issue && (
          <Card tone="clay" className="mb-4">
            <div className="tiny-caps">Issue raised</div>
            <div className="mt-1 font-display text-lg">{link.issue.type}</div>
            <div className="mt-2 italic">"{link.issue.note}"</div>
          </Card>
        )}

        {/* Released stamp */}
        {isReleased && (
          <Card tone="protected" className="mb-4 text-center">
            <PiSealCheckFill size={32} className="mx-auto" />
            <div className="font-display mt-2 text-2xl">
              Released to your bank
            </div>
            <div className="tiny-caps mt-1">
              {formatNaira(settledToSeller(link))} on the way
            </div>
          </Card>
        )}
      </PageSplit>

      <ActionBar>
        <GhostButton onClick={() => navigate({ to: "/seller" })}>
          Back to dashboard
        </GhostButton>
        {isWaiting && (
          <GhostButton
            onClick={() => navigate({ to: "/t/$id", params: { id: link.id } })}
          >
            Open as buyer →
          </GhostButton>
        )}
        {canDispatch && (
          <PrimaryButton
            onClick={() =>
              navigate({
                to: "/seller/txn/$id/dispatch",
                params: { id: link.id },
              })
            }
          >
            Mark as dispatched
          </PrimaryButton>
        )}
        {hasIssue && (
          <PrimaryButton
            tone="clay"
            onClick={() =>
              navigate({
                to: "/seller/txn/$id/respond",
                params: { id: link.id },
              })
            }
          >
            Respond to issue
          </PrimaryButton>
        )}
        {link.status === "delivered" && (
          <PrimaryButton tone="protected" onClick={release}>
            Release funds now
          </PrimaryButton>
        )}
      </ActionBar>
    </ScreenStage>
  );
}
