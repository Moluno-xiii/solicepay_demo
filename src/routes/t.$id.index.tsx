import { createFileRoute } from "@tanstack/react-router";
import { PiLockKeyFill, PiShieldCheckFill, PiStarFill } from "react-icons/pi";
import {
  ScreenStage,
  PageHeader,
  PageSplit,
  Card,
  ActionBar,
} from "@/components/ScreenStage";
import {
  MoneyRow,
  PrimaryLinkButton,
  GhostButton,
  Avatar,
  initialsOf,
  Stat,
  VerifiedPill,
} from "@/components/screen-bits";
import { useLink, useStore } from "@/lib/store";
import { formatNaira, platformFee, totalToProtect } from "@/lib/types";

export const Route = createFileRoute("/t/$id/")({
  component: BuyerReview,
});

function BuyerReview() {
  const { id } = Route.useParams();
  const link = useLink(id);
  const { setRole } = useStore();

  if (!link) {
    return (
      <ScreenStage>
        <PageHeader title="TrustLink not found" subtitle="It may have been reset or never existed." />
      </ScreenStage>
    );
  }

  const s = link.seller;

  return (
    <ScreenStage>
      <PageHeader
        eyebrow={`TrustLink · ${link.id}`}
        title={
          <>
            {s.name.split(" ")[0]} is selling you{" "}
            <em style={{ color: "var(--color-seal-deep)", fontStyle: "italic" }}>
              {link.product.name.split(" — ")[0]}.
            </em>
          </>
        }
        subtitle="Read the Trust Passport. Inspect the locked product proof. The money you pay sits in escrow until you confirm delivery."
      />

      <PageSplit
        asideWidth="wide"
        aside={
          <div className="space-y-4">
            {/* Money breakdown */}
            <Card>
              <div className="tiny-caps mb-2 text-ink-3">Order summary</div>
              <MoneyRow label="Subtotal" amount={formatNaira(link.product.price)} mute />
              <MoneyRow
                label={`Delivery (${s.city})`}
                amount={formatNaira(link.product.deliveryFee)}
                mute
              />
              <MoneyRow
                label={`Platform fee · ${link.platformFeePct}%`}
                amount={formatNaira(platformFee(link))}
                mute
              />
              <div className="border-t border-line my-2" />
              <MoneyRow
                label="Total to protect"
                amount={formatNaira(totalToProtect(link))}
                bold
              />
            </Card>

            <Card tone="protected">
              <div className="flex items-start gap-3">
                <PiShieldCheckFill size={22} className="mt-0.5 shrink-0" />
                <div>
                  <div className="font-display text-base">
                    Money held in escrow
                  </div>
                  <div className="tiny-caps mt-1">
                    Released only after you confirm delivery — or 48h after
                    delivery proof if you stay silent.
                  </div>
                </div>
              </div>
            </Card>
          </div>
        }
      >
        {/* Trust Passport */}
        <Card className="mb-6">
          <div className="flex items-start gap-4">
            <div className="relative">
              <Avatar hue={s.avatarHue} size={64} initials={initialsOf(s.name)} />
              <div className="absolute -right-1 -bottom-1 rounded-full bg-paper p-0.5">
                <PiShieldCheckFill className="text-protected" size={18} />
              </div>
            </div>
            <div className="flex-1">
              <div className="font-display text-2xl">{s.name}</div>
              <div className="tiny-caps text-ink-3 mt-0.5">
                {s.business} · {s.city}
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {s.verifications.map((v) => (
                  <VerifiedPill key={v}>{v}</VerifiedPill>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-4 border-t border-line pt-5">
            <Stat
              label="Trust Score"
              value={s.trustScore.toFixed(2)}
              sub={
                <span className="text-seal-deep flex items-center gap-1">
                  <PiStarFill size={9} />/5
                </span>
              }
            />
            <Stat label="Sales" value={String(s.sales)} sub="completed" />
            <Stat label="Delivery" value={`${s.deliveryRate}%`} sub="on time" />
          </div>
        </Card>

        {/* Product proof */}
        <Card>
          <div className="tiny-caps mb-3 flex items-center gap-1.5 text-protected">
            <PiLockKeyFill size={12} /> Locked product proof
          </div>
          <div className="grid grid-cols-4 gap-2">
            <div className="col-span-2 row-span-2 aspect-square rounded-xl bg-gradient-to-br from-ink/80 to-ink-2 relative">
              <div className="absolute inset-0 grid place-items-center text-paper/30 text-6xl font-display italic">
                iP
              </div>
            </div>
            {link.product.proofs.slice(0, 4).map((p, i) => (
              <div
                key={i}
                className="aspect-square rounded-xl bg-gradient-to-br from-paper-2 to-paper-3 grid place-items-center text-ink-3/40 text-xs font-display italic"
              >
                {p.label}
              </div>
            ))}
          </div>
          <div className="font-display mt-4 text-xl">{link.product.name}</div>
          <div className="tiny-caps text-ink-3 mt-1">{link.product.subtitle}</div>
        </Card>
      </PageSplit>

      <ActionBar>
        <GhostButton>Request changes</GhostButton>
        <PrimaryLinkButton
          tone="ink"
          to="/t/$id/pay"
          params={{ id: link.id }}
          onClick={() => setRole("buyer")}
        >
          Confirm & Pay {formatNaira(totalToProtect(link))} →
        </PrimaryLinkButton>
      </ActionBar>
    </ScreenStage>
  );
}
