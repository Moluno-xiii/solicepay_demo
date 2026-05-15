import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PiSealCheckFill } from "react-icons/pi";
import {
  ScreenStage,
  PageHeader,
  Card,
  ActionBar,
} from "@/components/ScreenStage";
import {
  MoneyRow,
  PrimaryButton,
  GhostButton,
} from "@/components/screen-bits";
import { BrandSeal } from "@/components/Brand";
import { useLink } from "@/lib/store";
import {
  formatNaira,
  platformFee,
  settledToSeller,
  totalToProtect,
} from "@/lib/types";

export const Route = createFileRoute("/t/$id/receipt")({
  component: BuyerReceipt,
});

function BuyerReceipt() {
  const { id } = Route.useParams();
  const link = useLink(id);
  const navigate = useNavigate();

  if (!link) return null;

  const t = link.timeline;
  const fmt = (iso: string | undefined) =>
    iso
      ? new Date(iso).toLocaleString("en-NG", {
          day: "numeric",
          month: "short",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      : "—";

  return (
    <ScreenStage>
      <PageHeader
        eyebrow="Step 08 · Both"
        title={
          <>
            Stamped, sealed,{" "}
            <em style={{ color: "var(--color-protected)", fontStyle: "italic" }}>
              settled.
            </em>
          </>
        }
        subtitle="Funds settle to the seller's bank. The receipt with the Released stamp lands in both histories. Both Trust Scores tick up."
        rightSlot={
          <span className="hidden items-center gap-1.5 rounded-full border border-protected/30 bg-protected-soft px-3 py-2 text-protected lg:inline-flex">
            <PiSealCheckFill size={13} />
            <span className="tiny-caps">Released</span>
          </span>
        }
      />

      {/* The receipt — intentionally narrow centred document */}
      <div className="mx-auto max-w-2xl">
        <Card className="relative receipt-rule">
          {/* Stamp */}
          <div
            className="absolute right-4 top-4 -rotate-12 stamp-frame"
            style={{ color: "var(--color-protected)" }}
          >
            <PiSealCheckFill /> Released
          </div>

          <div className="tiny-caps text-ink-3">SolicePay receipt</div>
          <div className="font-mono text-ink mt-1 text-base">{link.id}</div>

          <div className="mt-6 grid grid-cols-2 gap-6">
            <div>
              <div className="tiny-caps text-ink-3">Buyer</div>
              <div className="font-display mt-1 text-lg">
                {link.buyer.name}
              </div>
            </div>
            <div>
              <div className="tiny-caps text-ink-3">Seller</div>
              <div className="font-display mt-1 text-lg">
                {link.seller.name}
              </div>
            </div>
          </div>

          <div className="mt-5 border-t border-line pt-3">
            <MoneyRow
              label={link.product.name.split(" — ")[0]}
              amount={formatNaira(link.product.price)}
            />
            <MoneyRow
              label="Delivery"
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
              label="Buyer paid"
              amount={formatNaira(totalToProtect(link))}
              bold
            />
            <MoneyRow
              label="Settled to seller"
              amount={formatNaira(settledToSeller(link))}
            />
          </div>

          <div className="mt-5 rounded-xl bg-paper-2/40 px-4 py-3 text-sm">
            <div className="tiny-caps text-ink-3">Timeline</div>
            <div className="mt-2 grid grid-cols-2 gap-y-1 text-ink-2">
              <span className="text-ink-3">Created</span>
              <span className="font-mono text-right">{fmt(t.draft)}</span>
              <span className="text-ink-3">Paid</span>
              <span className="font-mono text-right">{fmt(t.protected)}</span>
              <span className="text-ink-3">Dispatched</span>
              <span className="font-mono text-right">{fmt(t.dispatched)}</span>
              <span className="text-protected font-medium">Released</span>
              <span className="font-mono text-right">{fmt(t.released)}</span>
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-line bg-paper p-4">
            <div className="tiny-caps mb-3 text-ink-3">
              Trust Scores updated
            </div>
            <div className="space-y-2">
              <ScoreRow
                name={link.seller.name.split(" ")[0]}
                value={`${link.seller.trustScore.toFixed(2)} → ${(link.seller.trustScore + 0.01).toFixed(2)}`}
              />
              <ScoreRow
                name={link.buyer.name.split(" ")[0]}
                value={`${link.buyer.trustScore.toFixed(2)} → ${(link.buyer.trustScore + 0.01).toFixed(2)}`}
              />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center">
            <BrandSeal size={88} tone="ink" />
          </div>
          <div className="mt-2 text-center tiny-caps text-ink-3">
            Stamped, sealed, settled — solicepay.app
          </div>
        </Card>
      </div>

      <ActionBar>
        <GhostButton onClick={() => navigate({ to: "/t/$id", params: { id: link.id } })}>
          Back to TrustLink
        </GhostButton>
        <PrimaryButton onClick={() => navigate({ to: "/seller" })}>
          Done — back to seller home
        </PrimaryButton>
      </ActionBar>
    </ScreenStage>
  );
}

function ScoreRow({ name, value }: { name: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-ink">{name}</span>
      <span className="font-mono text-protected">{value}</span>
    </div>
  );
}
