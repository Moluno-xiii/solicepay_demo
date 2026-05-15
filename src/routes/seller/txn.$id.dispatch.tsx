import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PiPackageFill, PiUploadSimple } from "react-icons/pi";
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
} from "@/components/screen-bits";
import { useLink, useStore } from "@/lib/store";

export const Route = createFileRoute("/seller/txn/$id/dispatch")({
  component: SellerDispatch,
});

function SellerDispatch() {
  const { id } = Route.useParams();
  const link = useLink(id);
  const { patchLink, advance } = useStore();

  const [courier, setCourier] = useState("GIG Logistics");
  const [tracking, setTracking] = useState("GIGL-7820-X4K");
  const [eta, setEta] = useState("17 May");

  if (!link) return null;

  const onSubmit = () => {
    patchLink(link.id, {
      dispatch: {
        courier,
        tracking,
        dispatchedAt: new Date().toLocaleString("en-NG", {
          day: "numeric",
          month: "short",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
        eta,
      },
    });
    advance(link.id, "dispatched");
  };

  return (
    <ScreenStage>
      <PageHeader
        back={`/seller/txn/${link.id}`}
        eyebrow="Step 06 · Seller"
        title={
          <>
            Mark as{" "}
            <em style={{ color: "var(--color-seal-deep)", fontStyle: "italic" }}>
              dispatched.
            </em>
          </>
        }
        subtitle="Upload your waybill so the buyer (and admin, if needed) can verify the package actually shipped."
      />

      <PageSplit
        asideWidth="wide"
        aside={
          <Card>
            <div className="tiny-caps mb-3 text-ink-3">Dispatch proof</div>
            <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-ink/70 to-ink-2 relative">
              <div className="absolute right-3 top-3 rounded-full bg-protected px-3 py-1 tiny-caps text-paper">
                Waybill
              </div>
              <div className="absolute bottom-3 left-3 tiny-caps text-paper/70">
                IMG_8231
              </div>
            </div>
            <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-line py-3 text-sm text-ink-3 transition hover:bg-paper-2/40">
              <PiUploadSimple size={14} /> Add another photo
            </button>

            <div className="mt-4 rounded-xl border border-protected/30 bg-protected-soft px-3 py-3 text-protected">
              <div className="flex items-start gap-2">
                <PiPackageFill size={18} className="mt-0.5" />
                <div className="text-sm">
                  {link.buyer.name.split(" ")[0]} will be notified instantly. They can also confirm receipt with a delivery photo.
                </div>
              </div>
            </div>
          </Card>
        }
      >
        <Card className="space-y-4">
          <Field label="Courier">
            <input
              value={courier}
              onChange={(e) => setCourier(e.target.value)}
              className="w-full bg-transparent font-display outline-none"
            />
          </Field>
          <Field label="Tracking number">
            <input
              value={tracking}
              onChange={(e) => setTracking(e.target.value)}
              className="w-full bg-transparent font-mono outline-none"
            />
          </Field>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Dispatched">
              <span className="font-mono text-sm">Now</span>
            </Field>
            <Field label="ETA">
              <input
                value={eta}
                onChange={(e) => setEta(e.target.value)}
                className="w-full bg-transparent font-mono outline-none"
              />
            </Field>
          </div>
        </Card>
      </PageSplit>

      <ActionBar>
        <GhostLinkButton to="/seller/txn/$id" params={{ id: link.id }}>
          Cancel
        </GhostLinkButton>
        <PrimaryLinkButton
          to="/seller/txn/$id"
          params={{ id: link.id }}
          onClick={onSubmit}
        >
          Mark as dispatched →
        </PrimaryLinkButton>
      </ActionBar>
    </ScreenStage>
  );
}
