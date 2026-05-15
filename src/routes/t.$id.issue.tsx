import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  PiCameraFill,
  PiCheck,
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
  PrimaryLinkButton,
  GhostButton,
} from "@/components/screen-bits";
import { useLink, useStore } from "@/lib/store";

const ISSUE_TYPES = [
  "Wrong item",
  "Damaged on arrival",
  "Not as described",
  "Item missing parts",
  "Fake / counterfeit",
];

export const Route = createFileRoute("/t/$id/issue")({
  component: BuyerIssue,
});

function BuyerIssue() {
  const { id } = Route.useParams();
  const link = useLink(id);
  const { reportIssue } = useStore();

  const [type, setType] = useState("Damaged on arrival");
  const [note, setNote] = useState(
    "The screen has a 2cm scratch from corner to centre. Picture taken right out of the packaging.",
  );

  if (!link) return null;

  const onSubmit = () => {
    reportIssue(link.id, {
      type,
      note,
      evidenceCount: 2,
      raisedAt: new Date().toISOString(),
    });
  };

  return (
    <ScreenStage>
      <PageHeader
        back={`/t/${link.id}/protected`}
        eyebrow="Step A · Buyer"
        title={
          <>
            Report an{" "}
            <em style={{ color: "var(--color-clay)", fontStyle: "italic" }}>
              issue.
            </em>
          </>
        }
        subtitle={`Pick what's wrong, upload evidence, write a note. ${link.seller.name.split(" ")[0]} has 24h to respond. Funds remain frozen until resolved.`}
        rightSlot={
          <div className="hidden rounded-2xl border border-clay/30 bg-clay-soft px-4 py-2 text-clay lg:block">
            <div className="tiny-caps">Funds frozen</div>
            <div className="font-mono text-base">held in escrow</div>
          </div>
        }
      />

      <Card tone="clay" className="mb-6">
        <div className="flex items-start gap-3">
          <PiWarningOctagonFill size={22} className="mt-0.5 shrink-0" />
          <div className="text-sm">
            {link.seller.name.split(" ")[0]} has 24h to respond. Money stays in
            escrow until resolved by the seller or SolicePay's ops team.
          </div>
        </div>
      </Card>

      <PageSplit
        asideWidth="wide"
        aside={
          <div className="space-y-4">
            <Card>
              <div className="tiny-caps mb-3 text-ink-3">Your evidence</div>
              <div className="grid grid-cols-3 gap-2">
                {[0, 1].map((i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-xl bg-gradient-to-br from-paper-2 to-paper-3 relative"
                  >
                    <div className="absolute right-1.5 top-1.5 rounded-full bg-clay p-0.5 text-paper">
                      <PiCheck size={11} />
                    </div>
                  </div>
                ))}
                <button className="aspect-square rounded-xl border border-dashed border-line text-ink-3 grid place-items-center transition hover:bg-paper-2/40">
                  <PiCameraFill size={22} />
                </button>
              </div>
            </Card>

            <Card>
              <div className="tiny-caps mb-2 text-ink-3">Note to seller</div>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={5}
                className="w-full bg-transparent italic text-sm outline-none resize-none"
              />
            </Card>
          </div>
        }
      >
        <Card>
          <div className="tiny-caps mb-3 text-ink-3">What's wrong?</div>
          <div className="grid gap-2 md:grid-cols-2">
            {ISSUE_TYPES.map((label) => {
              const active = type === label;
              return (
                <button
                  key={label}
                  onClick={() => setType(label)}
                  className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition ${
                    active
                      ? "border-clay bg-clay-soft text-clay"
                      : "border-line bg-paper text-ink hover:bg-paper-2/30"
                  }`}
                >
                  <span>{label}</span>
                  {active && <PiCheck size={14} />}
                </button>
              );
            })}
          </div>
        </Card>
      </PageSplit>

      <ActionBar>
        <GhostButton onClick={() => window.history.back()}>
          Cancel
        </GhostButton>
        <PrimaryLinkButton
          tone="clay"
          to="/seller/txn/$id"
          params={{ id: link.id }}
          onClick={onSubmit}
        >
          Submit issue · Freeze release →
        </PrimaryLinkButton>
      </ActionBar>
    </ScreenStage>
  );
}
