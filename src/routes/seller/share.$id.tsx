import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  PiArrowUpRight,
  PiCheck,
  PiCopy,
  PiSealCheckFill,
} from "react-icons/pi";
import {
  FaWhatsapp,
  FaInstagram,
  FaTiktok,
  FaTelegramPlane,
  FaFacebookMessenger,
} from "react-icons/fa";
import {
  ScreenStage,
  PageHeader,
  PageSplit,
  Card,
  ActionBar,
} from "@/components/ScreenStage";
import {
  PrimaryLinkButton,
  GhostLinkButton,
} from "@/components/screen-bits";
import { useLink, useStore } from "@/lib/store";
import { formatNaira } from "@/lib/types";

export const Route = createFileRoute("/seller/share/$id")({
  component: ShareLink,
});

function ShareLink() {
  const { id } = Route.useParams();
  const link = useLink(id);
  const { advance, setRole } = useStore();
  const [copied, setCopied] = useState(false);

  if (!link) return <NotFound />;

  const url = `${window.location.origin}/t/${link.id}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* ignore */
    }
  };

  const onOpenAsBuyer = () => {
    if (link.status === "draft") advance(link.id, "pending_payment");
    setRole("buyer");
  };

  const channels = [
    { Icon: FaWhatsapp, name: "WhatsApp", color: "#25D366" },
    { Icon: FaInstagram, name: "Instagram", color: "#E1306C" },
    { Icon: FaTiktok, name: "TikTok", color: "currentColor" },
    { Icon: FaTelegramPlane, name: "Telegram", color: "#229ED9" },
    { Icon: FaFacebookMessenger, name: "Messenger", color: "#0084FF" },
    { Icon: PiArrowUpRight, name: "More", color: "currentColor" },
  ];

  return (
    <ScreenStage>
      <PageHeader
        back="/seller"
        eyebrow="Step 02 · Seller → Buyer"
        title={
          <>
            TrustLink{" "}
            <em style={{ color: "var(--color-seal-deep)", fontStyle: "italic" }}>
              ready.
            </em>
          </>
        }
        subtitle={
          <>
            Drop the link in any chat. The buyer pays — money goes to escrow,
            never your account. For the demo: tap{" "}
            <span className="text-ink font-medium">Open as buyer</span> to
            switch roles and walk through the buyer side.
          </>
        }
        rightSlot={
          <span className="hidden items-center gap-1.5 rounded-full bg-protected-soft px-3 py-2 text-protected lg:inline-flex">
            <PiSealCheckFill size={13} />
            <span className="tiny-caps">Sealed</span>
          </span>
        }
      />

      <PageSplit
        asideWidth="wide"
        aside={
          <Card>
            <div className="tiny-caps text-ink-3">Preview seen by buyer</div>
            <div className="mt-3 overflow-hidden rounded-2xl border border-line bg-paper">
              <div className="flex items-center gap-3 px-4 py-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-seal to-seal-deep" />
                <div className="flex-1">
                  <div className="font-display text-sm">
                    {link.seller.name.split(" ")[0]} is selling{" "}
                    {link.product.name.split(" ").slice(0, 4).join(" ")}
                  </div>
                  <div className="tiny-caps text-ink-3">
                    {formatNaira(link.product.price + link.product.deliveryFee)}{" "}
                    · {link.seller.city}
                  </div>
                </div>
                <PiArrowUpRight className="text-ink-3" />
              </div>
              <div className="grid grid-cols-3 gap-px bg-line">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="aspect-square bg-gradient-to-br from-paper-2 to-paper-3"
                  />
                ))}
              </div>
            </div>
          </Card>
        }
      >
        <Card>
          <div className="tiny-caps text-ink-3">TrustLink URL</div>
          <div className="mt-2 flex items-center justify-between gap-3 rounded-xl border border-line bg-paper-2/40 px-4 py-3">
            <span className="font-mono truncate text-base text-ink">
              {url.replace(/^https?:\/\//, "")}
            </span>
            <button
              onClick={copy}
              className="flex shrink-0 items-center gap-1.5 rounded-lg bg-ink px-3 py-2 text-paper transition hover:bg-ink-2"
            >
              {copied ? <PiCheck size={14} /> : <PiCopy size={14} />}
              <span className="tiny-caps">{copied ? "Copied" : "Copy"}</span>
            </button>
          </div>

          <div className="mt-6 tiny-caps text-ink-3">Send via</div>
          <div className="mt-2 grid grid-cols-3 gap-3 sm:grid-cols-6">
            {channels.map(({ Icon, name, color }) => (
              <Link
                key={name}
                to="/t/$id"
                params={{ id: link.id }}
                onClick={onOpenAsBuyer}
                className="flex flex-col items-center gap-2 rounded-2xl border border-line bg-paper py-4 transition hover:bg-paper-2/40"
              >
                <Icon size={24} color={color} />
                <span className="tiny-caps text-ink-3">{name}</span>
              </Link>
            ))}
          </div>
        </Card>
      </PageSplit>

      <ActionBar>
        <GhostLinkButton to="/seller">Back to dashboard</GhostLinkButton>
        <PrimaryLinkButton
          tone="protected"
          to="/t/$id"
          params={{ id: link.id }}
          onClick={onOpenAsBuyer}
        >
          Open as buyer →
        </PrimaryLinkButton>
      </ActionBar>
    </ScreenStage>
  );
}

function NotFound() {
  return (
    <ScreenStage>
      <PageHeader title="TrustLink not found" back="/seller" />
    </ScreenStage>
  );
}
