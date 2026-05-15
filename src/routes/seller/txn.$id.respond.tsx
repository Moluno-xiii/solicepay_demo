import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PiCheck, PiWarningOctagonFill } from "react-icons/pi";
import {
  ScreenStage,
  PageHeader,
  Card,
  ActionBar,
} from "@/components/ScreenStage";
import {
  PrimaryLinkButton,
  GhostLinkButton,
} from "@/components/screen-bits";
import { useLink, useStore } from "@/lib/store";
import { formatNaira, totalToProtect } from "@/lib/types";

export const Route = createFileRoute("/seller/txn/$id/respond")({
  component: SellerRespond,
});

function SellerRespond() {
  const { id } = Route.useParams();
  const link = useLink(id);
  const { patchLink, advance } = useStore();

  const [choice, setChoice] = useState<"refund" | "partial" | "replacement" | "contest">("partial");

  if (!link || !link.issue) return null;

  const onSubmit = () => {
    patchLink(link.id, {
      issue: { ...link.issue!, sellerResponse: { kind: choice } },
    });
    if (choice === "refund") advance(link.id, "refunded");
    if (choice === "contest" || choice === "replacement")
      advance(link.id, "issue_open");
    if (choice === "partial") advance(link.id, "released");
  };

  return (
    <ScreenStage>
      <PageHeader
        back={`/seller/txn/${link.id}`}
        eyebrow="Step B · Seller"
        title={
          <>
            Respond to{" "}
            <em style={{ color: "var(--color-clay)", fontStyle: "italic" }}>
              issue.
            </em>
          </>
        }
        subtitle="Pick a path: full refund, partial refund, replacement, or contest the claim. Funds remain frozen until you act."
        rightSlot={
          <div className="hidden rounded-2xl border border-clay/30 bg-clay-soft px-4 py-2 text-clay lg:block">
            <div className="tiny-caps">Respond within</div>
            <div className="font-mono text-base">23:42:11</div>
          </div>
        }
      />

      {/* Issue summary */}
      <Card tone="clay" className="mb-6">
        <div className="flex items-start gap-3">
          <PiWarningOctagonFill size={22} className="mt-0.5 shrink-0" />
          <div className="flex-1">
            <div className="tiny-caps">Issue raised by {link.buyer.name.split(" ")[0]}</div>
            <div className="font-display mt-1 text-xl">{link.issue.type}</div>
            <div className="mt-2 italic">"{link.issue.note}"</div>
          </div>
        </div>
      </Card>

      {/* Side-by-side evidence */}
      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <div className="tiny-caps mb-3 text-clay">Buyer's evidence</div>
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: link.issue.evidenceCount }).map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-lg bg-gradient-to-br from-paper-2 to-paper-3"
              />
            ))}
          </div>
        </Card>
        <Card>
          <div className="tiny-caps mb-3 text-protected">Your locked product proof</div>
          <div className="grid grid-cols-3 gap-2">
            {link.product.proofs.slice(0, 3).map((p, i) => (
              <div
                key={i}
                className="aspect-square rounded-lg bg-gradient-to-br from-ink/70 to-ink-2 relative"
              >
                <div className="absolute left-1.5 top-1.5 rounded bg-protected px-1.5 tiny-caps text-paper">
                  LOCKED
                </div>
                <div className="absolute inset-0 grid place-items-center text-paper/40 font-display italic">
                  {p.label}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Response choices */}
      <Card>
        <div className="tiny-caps mb-3 text-ink-3">Choose response</div>
        <div className="grid gap-3 md:grid-cols-2">
          <ResponseRow
            active={choice === "refund"}
            onClick={() => setChoice("refund")}
            label="Accept full refund"
            sub={`${formatNaira(totalToProtect(link))} returned to ${link.buyer.name.split(" ")[0]}`}
          />
          <ResponseRow
            active={choice === "partial"}
            onClick={() => setChoice("partial")}
            label="Offer partial refund"
            sub="Suggest ₦150,000 + buyer keeps item"
          />
          <ResponseRow
            active={choice === "replacement"}
            onClick={() => setChoice("replacement")}
            label="Send replacement"
            sub="Within 5 business days"
          />
          <ResponseRow
            active={choice === "contest"}
            onClick={() => setChoice("contest")}
            label="Contest with evidence"
            sub="Upload counter-proof to admin"
          />
        </div>
      </Card>

      <ActionBar>
        <GhostLinkButton to="/seller/txn/$id" params={{ id: link.id }}>
          Cancel
        </GhostLinkButton>
        <PrimaryLinkButton
          to="/seller/txn/$id"
          params={{ id: link.id }}
          onClick={onSubmit}
        >
          Send response →
        </PrimaryLinkButton>
      </ActionBar>
    </ScreenStage>
  );
}

function ResponseRow({
  active,
  onClick,
  label,
  sub,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  sub: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-start gap-3 rounded-xl border p-4 text-left transition ${
        active
          ? "border-ink bg-paper-2/60"
          : "border-line bg-paper hover:bg-paper-2/30"
      }`}
    >
      <div
        className={`mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full border ${
          active ? "border-ink bg-ink text-paper" : "border-line"
        }`}
      >
        {active && <PiCheck size={11} />}
      </div>
      <div className="flex-1">
        <div className="font-display text-base">{label}</div>
        <div className="tiny-caps mt-1 text-ink-3">{sub}</div>
      </div>
    </button>
  );
}
