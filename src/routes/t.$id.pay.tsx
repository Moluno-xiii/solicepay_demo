import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PiLockKeyFill, PiShieldCheckFill } from "react-icons/pi";
import { SiFlutter } from "react-icons/si";
import {
  ScreenStage,
  PageHeader,
  PageSplit,
  Card,
  ActionBar,
} from "@/components/ScreenStage";
import {
  Field,
  PrimaryLinkButton,
  GhostLinkButton,
  MoneyRow,
} from "@/components/screen-bits";
import { useLink, useStore } from "@/lib/store";
import {
  formatNaira,
  platformFee,
  totalToProtect,
} from "@/lib/types";

export const Route = createFileRoute("/t/$id/pay")({
  component: BuyerPay,
});

function BuyerPay() {
  const { id } = Route.useParams();
  const link = useLink(id);
  const { advance } = useStore();
  const [method, setMethod] = useState<"Card" | "Bank" | "USSD">("Card");

  if (!link) return null;

  return (
    <ScreenStage>
      <PageHeader
        back={`/t/${link.id}`}
        eyebrow="Step 04 · Buyer"
        title={
          <>
            Pay &{" "}
            <em style={{ color: "var(--color-protected)", fontStyle: "italic" }}>
              Protect.
            </em>
          </>
        }
        subtitle={
          <>
            One payment. Funds go to escrow under Flutterwave's{" "}
            <code className="font-mono mx-1 text-sm">rave_escrow_tx</code>{" "}
            metadata — they never touch the seller's account until delivery is confirmed.
          </>
        }
      />

      <PageSplit
        asideWidth="wide"
        aside={
          <div className="space-y-4">
            <Card className="text-center">
              <div className="tiny-caps text-ink-3">Amount to protect</div>
              <div
                className="font-display mt-2 text-ink"
                style={{ fontSize: 48, lineHeight: 1, letterSpacing: "-0.025em" }}
              >
                <span className="font-mono numeric">
                  {formatNaira(totalToProtect(link))}
                </span>
              </div>
              <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-protected-soft px-3 py-1.5 text-protected">
                <PiLockKeyFill size={12} />
                <span className="tiny-caps">Held in escrow until delivery</span>
              </div>
            </Card>

            <Card>
              <div className="tiny-caps mb-2 text-ink-3">Order</div>
              <MoneyRow
                label="Subtotal"
                amount={formatNaira(link.product.price)}
                mute
              />
              <MoneyRow
                label="Delivery"
                amount={formatNaira(link.product.deliveryFee)}
                mute
              />
              <MoneyRow
                label="Platform fee"
                amount={formatNaira(platformFee(link))}
                mute
              />
              <div className="border-t border-line my-1" />
              <MoneyRow
                label="Total"
                amount={formatNaira(totalToProtect(link))}
                bold
              />
            </Card>

            <Card tone="protected">
              <div className="flex items-start gap-2">
                <PiShieldCheckFill size={18} className="mt-0.5 shrink-0" />
                <div className="text-sm">
                  Released only when you confirm delivery, or 48h after the
                  seller uploads valid delivery proof.
                </div>
              </div>
            </Card>
          </div>
        }
      >
        <Card className="space-y-5">
          <div>
            <div className="tiny-caps mb-2 text-ink-3">Payment method</div>
            <div className="grid grid-cols-3 gap-2">
              {(["Card", "Bank", "USSD"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMethod(m)}
                  className={`rounded-xl border py-3 text-sm transition ${
                    method === m
                      ? "border-ink bg-ink text-paper"
                      : "border-line bg-paper text-ink hover:bg-paper-2/40"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <Field label="Card number">
            <span className="font-mono text-base">4556 •••• •••• 3902</span>
          </Field>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Expiry">
              <span className="font-mono text-base">09 / 28</span>
            </Field>
            <Field label="CVV">
              <span className="font-mono text-base">•••</span>
            </Field>
          </div>

          <div className="rounded-xl bg-paper-2/40 p-3 text-sm text-ink-3">
            By paying you accept SolicePay's protection terms. Funds release on
            confirmed delivery or 48h after delivery proof.
          </div>

          <div
            className="flex items-center justify-center gap-1.5 tiny-caps text-ink-3"
          >
            Powered by{" "}
            <SiFlutter size={12} className="text-[#F5A623]" /> Flutterwave Escrow
          </div>
        </Card>
      </PageSplit>

      <ActionBar>
        <GhostLinkButton to="/t/$id" params={{ id: link.id }}>
          Back
        </GhostLinkButton>
        <PrimaryLinkButton
          tone="protected"
          to="/t/$id/protected"
          params={{ id: link.id }}
          onClick={() => advance(link.id, "protected")}
        >
          Pay & Protect {formatNaira(totalToProtect(link))} →
        </PrimaryLinkButton>
      </ActionBar>
    </ScreenStage>
  );
}
