import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  PiCameraFill,
  PiCheck,
  PiLockKeyFill,
  PiVideoCameraFill,
  PiShieldCheckFill,
} from "react-icons/pi";
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
import { useStore, makeLinkId, newDraftLink } from "@/lib/store";
import { formatNaira } from "@/lib/types";

export const Route = createFileRoute("/seller/create")({
  component: CreateTrustLink,
});

function CreateTrustLink() {
  const { upsertLink } = useStore();
  const [name, setName] = useState("iPhone 15 Pro Max — Natural Titanium");
  const [subtitle, setSubtitle] = useState("256GB · Sealed box");
  const [price, setPrice] = useState(1_250_000);
  const [delivery, setDelivery] = useState(5_000);

  // Pre-generate the new link's ID so the Link's `to` is known at render
  // time. The actual data is committed in the click handler.
  const newId = useMemo(() => makeLinkId(), []);

  const fee = Math.round(price * 0.012);
  const total = price + delivery + fee;

  const onGenerate = () => {
    upsertLink(
      newDraftLink({
        id: newId,
        product: {
          name,
          subtitle,
          price,
          deliveryFee: delivery,
          proofs: [
            { label: "FRONT", kind: "photo" },
            { label: "BACK", kind: "photo" },
            { label: "BOX", kind: "photo" },
            { label: "VID", kind: "video" },
          ],
          proofLockedAt: new Date().toLocaleTimeString("en-NG", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }),
        },
      }),
    );
  };

  return (
    <ScreenStage>
      <PageHeader
        back="/seller"
        eyebrow="Step 01 · Seller"
        title={
          <>
            New <em style={{ color: "var(--color-seal-deep)", fontStyle: "italic" }}>TrustLink.</em>
          </>
        }
        subtitle="Fill in what you're selling and capture Live Proof inside the app. Once generated, the buyer can request changes — but you can't silently swap the product after they pay."
      />

      <PageSplit
        aside={
          <Card>
            <div className="tiny-caps mb-3 text-ink-3">Live preview</div>
            <div className="font-display text-lg">{name || "Untitled product"}</div>
            <div className="tiny-caps mt-1 text-ink-3">{subtitle || "—"}</div>

            <div className="mt-4">
              <MoneyRow label="Price" amount={formatNaira(price)} mute />
              <MoneyRow label="Delivery" amount={formatNaira(delivery)} mute />
              <MoneyRow label="Platform fee · 1.2%" amount={formatNaira(fee)} mute />
              <div className="border-t border-line my-2" />
              <MoneyRow label="Buyer pays" amount={formatNaira(total)} bold />
            </div>

            <div className="mt-4 rounded-xl border border-protected/30 bg-protected-soft px-3 py-2.5 text-protected">
              <div className="flex items-start gap-2">
                <PiShieldCheckFill className="mt-0.5" />
                <div>
                  <div className="font-display text-sm">
                    Money held in escrow
                  </div>
                  <div className="tiny-caps mt-0.5">
                    Released only after delivery confirmed
                  </div>
                </div>
              </div>
            </div>
          </Card>
        }
      >
        <Card className="space-y-5">
          <div>
            <div className="tiny-caps mb-2 text-ink-3">I'm</div>
            <div className="inline-flex rounded-full border border-line bg-paper p-0.5">
              <span className="rounded-full px-4 py-1.5 text-sm text-ink-3">Buying</span>
              <span className="rounded-full bg-ink px-4 py-1.5 text-sm text-paper">Selling</span>
            </div>
          </div>

          <Field label="Product name">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-transparent font-display outline-none"
            />
          </Field>
          <Field label="Description">
            <input
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full bg-transparent outline-none"
            />
          </Field>
          <div className="grid gap-3 md:grid-cols-2">
            <Field label="Price (₦)">
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full bg-transparent font-mono numeric outline-none"
              />
            </Field>
            <Field label="Delivery fee (₦)">
              <input
                type="number"
                value={delivery}
                onChange={(e) => setDelivery(Number(e.target.value))}
                className="w-full bg-transparent font-mono numeric outline-none"
              />
            </Field>
          </div>

          <div>
            <div className="tiny-caps mb-2 text-ink-3">Live Proof — required</div>
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-4">
              {[0, 1, 2].map((i) => (
                <ProofTile key={i} Icon={PiCameraFill} />
              ))}
              <ProofTile Icon={PiVideoCameraFill} />
            </div>
            <div className="tiny-caps mt-2 flex items-center gap-1 text-protected">
              <PiLockKeyFill size={11} /> Will lock on generation
            </div>
          </div>
        </Card>
      </PageSplit>

      <ActionBar>
        <GhostLinkButton to="/seller">Cancel</GhostLinkButton>
        <PrimaryLinkButton
          to="/seller/share/$id"
          params={{ id: newId }}
          onClick={onGenerate}
        >
          Generate TrustLink →
        </PrimaryLinkButton>
      </ActionBar>
    </ScreenStage>
  );
}

function ProofTile({ Icon }: { Icon: any }) {
  return (
    <div className="aspect-square rounded-lg border border-line bg-gradient-to-br from-paper-2 to-paper-3 relative">
      <div className="absolute inset-0 grid place-items-center text-ink-3">
        <Icon size={22} />
      </div>
      <div className="absolute right-1 top-1 rounded-full bg-protected p-0.5 text-paper">
        <PiCheck size={10} />
      </div>
    </div>
  );
}
