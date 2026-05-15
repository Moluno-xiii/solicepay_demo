import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  PiArrowLeft,
  PiArrowRight,
  PiArrowUpRight,
  PiCameraFill,
  PiCheck,
  PiCheckCircleFill,
  PiCopy,
  PiLockKeyFill,
  PiPackageFill,
  PiPaperPlaneTiltFill,
  PiSealCheckFill,
  PiShieldCheckFill,
  PiStarFill,
  PiUploadSimple,
  PiVideoCameraFill,
  PiWarningOctagonFill,
  PiXCircleFill,
} from "react-icons/pi";
import {
  FaWhatsapp,
  FaInstagram,
  FaTiktok,
  FaTelegramPlane,
  FaFacebookMessenger,
} from "react-icons/fa";
import { SiFlutter } from "react-icons/si";
import { BrandSeal, Wordmark } from "@/components/Brand";
import { Phone } from "@/components/Phone";

export const Route = createFileRoute("/")({
  component: Index,
});

/* ==================================================================
   PAGE
   ================================================================== */
function Index() {
  return (
    <div className="w-full">
      <Hero />
      <Marquee />
      <JourneyIntro />
      <JourneyGrid />
      <Anatomy />
      <DisputeBranch />
      <ClosingFooter />
    </div>
  );
}

/* ==================================================================
   HERO
   ================================================================== */
function Hero() {
  return (
    <section className="relative mx-auto w-full max-w-[1320px] px-8 pt-10 pb-20 lg:px-14">
      <div className="mb-16 flex items-center justify-between">
        <Wordmark size={28} />
        <div className="hidden items-center gap-8 md:flex">
          <span className="tiny-caps text-ink-3">Product PRD · v0.4</span>
          <span className="tiny-caps text-ink-3">Demo build</span>
          <span className="stamp-frame text-protected">
            <span className="block h-1.5 w-1.5 rounded-full bg-protected" /> Live
          </span>
        </div>
      </div>

      <div className="grid items-end gap-12 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <div className="tiny-caps mb-6 text-ink-3">
            <span className="text-ink">No. 001</span> &nbsp;·&nbsp; The trust
            infrastructure for social commerce
          </div>
          <h1
            className="font-display-soft text-ink rise"
            style={{
              fontSize: "clamp(56px, 9vw, 132px)",
              lineHeight: 0.92,
              letterSpacing: "-0.035em",
              fontVariationSettings: '"opsz" 144, "SOFT" 100, "wght" 380',
            }}
          >
            Buy and sell
            <br />
            <span style={{ fontStyle: "italic", color: "var(--color-seal-deep)" }}>
              without
            </span>{" "}
            fear.
          </h1>
          <p
            className="mt-10 max-w-2xl text-ink-2"
            style={{ fontSize: 19, lineHeight: 1.55 }}
          >
            <strong className="text-ink">SolicePay</strong> turns a chat on
            WhatsApp, Instagram, or TikTok into a stamped, protected
            transaction. Every deal is a <em>TrustLink</em> — a sealed
            document that holds the money, locks the product proof, and pays
            the seller only when delivery is confirmed.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              to="/seller"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-paper transition hover:bg-ink-2"
            >
              <span className="tiny-caps">Try the live demo</span>
              <PiArrowRight />
            </Link>
            <a
              href="#journey"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-5 py-3 text-ink transition hover:bg-paper-2"
            >
              <span className="tiny-caps">Walk the journey</span>
            </a>
            <span className="stamp-frame text-protected">
              <PiShieldCheckFill /> Flutterwave escrow
            </span>
          </div>
        </div>

        <div className="relative lg:col-span-4">
          <div className="relative ml-auto flex aspect-square w-full max-w-[360px] items-center justify-center">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(200,165,82,0.14), transparent 65%)",
              }}
            />
            <BrandSeal size={340} spin />
            <div
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-ink px-4 py-2 tiny-caps text-paper"
              style={{ letterSpacing: "0.28em" }}
            >
              The Seal of Protection
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20 grid grid-cols-2 gap-8 border-t border-line pt-8 md:grid-cols-4">
        {[
          ["Buyer ↔ Seller", "core interaction model"],
          ["TrustLink", "the transaction object"],
          ["Trust Passport", "portable reputation"],
          ["Protected Payment", "Flutterwave escrow rail"],
        ].map(([k, v]) => (
          <div key={k}>
            <div
              className="font-display text-ink"
              style={{ fontSize: 22, lineHeight: 1.1 }}
            >
              {k}
            </div>
            <div className="tiny-caps mt-2 text-ink-3">{v}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ==================================================================
   MARQUEE STRIP
   ================================================================== */
function Marquee() {
  const text =
    "·  TRUSTLINK  ·  PROTECTED COMMERCE  ·  SOLICEPAY  ·  ESCROW BY FLUTTERWAVE  ·  WHATSAPP · INSTAGRAM · TIKTOK · TELEGRAM  ·  TRUSTLINK  ·  ";
  return (
    <div className="overflow-hidden border-y border-ink bg-ink py-3 text-paper">
      <div
        className="flex shrink-0 gap-12 whitespace-nowrap"
        style={{
          animation: "marquee 38s linear infinite",
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          letterSpacing: "0.34em",
          textTransform: "uppercase",
        }}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i} className="flex items-center gap-12">
            <span>{text}</span>
            <PiSealCheckFill className="text-seal" size={14} />
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

/* ==================================================================
   JOURNEY INTRO
   ================================================================== */
function JourneyIntro() {
  return (
    <section
      id="journey"
      className="mx-auto max-w-[1320px] px-8 pt-24 pb-10 lg:px-14"
    >
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <div className="tiny-caps text-ink-3">Chapter I</div>
          <div
            className="mt-2 font-display"
            style={{
              fontSize: 64,
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
              fontVariationSettings: '"opsz" 144, "SOFT" 50, "wght" 420',
            }}
          >
            The
            <br />
            <em style={{ color: "var(--color-seal-deep)" }}>golden path.</em>
          </div>
        </div>
        <div className="lg:col-span-5">
          <p
            style={{ fontSize: 17, lineHeight: 1.6 }}
            className="text-ink-2"
          >
            From a DM to a delivered package. Eight screens trace the full
            buyer ↔ seller dance — from the first product photo to the
            settlement stamp on the receipt. Each TrustLink is born, sealed,
            shipped, confirmed, and paid out.
          </p>
        </div>
        <div className="lg:col-span-4">
          <ul className="space-y-3 border-l border-line pl-6 text-sm text-ink-2">
            {[
              ["Seller", "creates the TrustLink + uploads Live Proof"],
              ["Buyer", "reviews seller's Trust Passport, pays via Flutterwave"],
              ["Both", "see Payment Protected — money held in escrow"],
              ["Seller", "ships, uploads waybill"],
              ["Buyer", "confirms delivery — funds release"],
            ].map(([who, what]) => (
              <li key={who} className="flex gap-3">
                <span className="tiny-caps min-w-[56px] text-protected">
                  {who}
                </span>
                <span>{what}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ==================================================================
   JOURNEY GRID — the 8 phone screens
   ================================================================== */
function JourneyGrid() {
  return (
    <section className="mx-auto max-w-[1320px] px-8 pb-32 lg:px-14">
      <div className="grid gap-x-16 gap-y-32 lg:grid-cols-2">
        <Step
          n="01"
          actor="Seller"
          title="Create the TrustLink"
          body="Lara opens SolicePay, picks 'I'm selling' and fills in the product. She captures Live Proof in-app — a sealed, timestamped record the buyer can rely on."
          phone={<ScreenSellerCreate />}
        />
        <Step
          n="02"
          actor="Seller → Buyer"
          title="Share to where the buyer is"
          body="The TrustLink is generated. Lara sends it on WhatsApp — the same chat where the deal began. No new app for her buyer to learn."
          phone={<ScreenShare />}
          align="right"
        />
        <Step
          n="03"
          actor="Buyer"
          title="Open the link, meet the seller"
          body="Tunde sees Lara's Trust Passport before he sees the price. Live Proof, fees, dispute window — all on one document. Confirm or request changes."
          phone={<ScreenBuyerReview />}
        />
        <Step
          n="04"
          actor="Buyer"
          title="Pay & Protect"
          body="Flutterwave handles the rail; SolicePay tells it to hold. Tunde pays once. The money never goes to Lara's account — it goes to escrow."
          phone={<ScreenPay />}
          align="right"
        />
        <DualStep />
        <Step
          n="06"
          actor="Seller"
          title="Mark as dispatched"
          body="Lara ships through her own courier and uploads the waybill. The TrustLink advances; Tunde gets a push notification."
          phone={<ScreenDispatch />}
        />
        <Step
          n="07"
          actor="Buyer"
          title="Confirm receipt — three honest options"
          body="When the package arrives, Tunde tells SolicePay what really happened. If he stays silent for 48h with valid delivery proof, funds auto-release."
          phone={<ScreenConfirm />}
          align="right"
        />
        <Step
          n="08"
          actor="Both"
          title="The seal closes the deal"
          body="Funds settle to Lara's bank. A receipt with the Released stamp lands in both histories. Trust Scores update. The next sale gets easier."
          phone={<ScreenReceipt />}
        />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
   Step layout helper
   ------------------------------------------------------------------ */
function Step({
  n,
  actor,
  title,
  body,
  phone,
  align = "left",
}: {
  n: string;
  actor: string;
  title: string;
  body: string;
  phone: React.ReactNode;
  align?: "left" | "right";
}) {
  const left = (
    <div className="flex flex-col">
      <div className="flex items-baseline gap-4">
        <span
          className="font-display-soft"
          style={{
            fontSize: 96,
            lineHeight: 0.85,
            color: "var(--color-seal-deep)",
            fontVariationSettings: '"opsz" 144, "SOFT" 100, "wght" 380',
            fontStyle: "italic",
          }}
        >
          {n}
        </span>
        <div className="flex flex-col">
          <span className="tiny-caps text-ink-3">
            Step {n} · {actor}
          </span>
          <span
            className="font-display text-ink mt-1"
            style={{ fontSize: 30, lineHeight: 1.05, letterSpacing: "-0.015em" }}
          >
            {title}
          </span>
        </div>
      </div>
      <p
        className="mt-6 max-w-md text-ink-2"
        style={{ fontSize: 16, lineHeight: 1.6 }}
      >
        {body}
      </p>
    </div>
  );

  return (
    <div
      className={`flex flex-col items-center gap-10 lg:flex-row ${align === "right" ? "lg:flex-row-reverse" : ""}`}
    >
      <div className="flex-1">{left}</div>
      <div className="shrink-0">{phone}</div>
    </div>
  );
}

/* ==================================================================
   STEP 05 — DUAL VIEW
   ================================================================== */
function DualStep() {
  const [view, setView] = useState<"buyer" | "seller">("buyer");
  return (
    <div className="lg:col-span-2">
      <div className="rounded-3xl border border-line bg-paper-2/40 p-10 lg:p-16">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <div className="flex items-baseline gap-4">
              <span
                className="font-display-soft"
                style={{
                  fontSize: 120,
                  lineHeight: 0.85,
                  color: "var(--color-protected)",
                  fontStyle: "italic",
                  fontVariationSettings:
                    '"opsz" 144, "SOFT" 100, "wght" 380',
                }}
              >
                05
              </span>
              <div>
                <div className="tiny-caps text-ink-3">Step 05 · The hinge</div>
                <div
                  className="font-display mt-1"
                  style={{
                    fontSize: 36,
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                  }}
                >
                  Payment Protected.
                </div>
              </div>
            </div>
            <p
              className="mt-6 max-w-lg text-ink-2"
              style={{ fontSize: 17, lineHeight: 1.6 }}
            >
              The most important screen in the product. Same status, two
              vantage points. The buyer sees safety. The seller sees
              commitment. Neither side can cheat the moment.
            </p>

            <div className="mt-8 inline-flex rounded-full border border-line bg-paper p-1">
              <button
                onClick={() => setView("buyer")}
                className={`px-5 py-2.5 text-sm rounded-full tiny-caps transition ${view === "buyer" ? "bg-ink text-paper" : "text-ink-3 hover:text-ink"}`}
              >
                View as Buyer
              </button>
              <button
                onClick={() => setView("seller")}
                className={`px-5 py-2.5 text-sm rounded-full tiny-caps transition ${view === "seller" ? "bg-ink text-paper" : "text-ink-3 hover:text-ink"}`}
              >
                View as Seller
              </button>
            </div>

            <ul className="mt-8 space-y-3 text-sm text-ink-2">
              <li className="flex gap-3">
                <PiCheck className="mt-1 text-protected" />
                Funds held by Flutterwave under escrow metadata
              </li>
              <li className="flex gap-3">
                <PiCheck className="mt-1 text-protected" />
                Cannot be released until buyer confirms or auto-release fires
              </li>
              <li className="flex gap-3">
                <PiCheck className="mt-1 text-protected" />
                Either side can open a dispute and freeze the timer
              </li>
            </ul>
          </div>

          <div className="lg:col-span-7 flex justify-center">
            <ScreenProtected view={view} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==================================================================
   ANATOMY
   ================================================================== */
function Anatomy() {
  return (
    <section className="mx-auto max-w-[1320px] px-8 pb-32 lg:px-14">
      <div className="mb-12">
        <div className="tiny-caps text-ink-3">Chapter II</div>
        <h2
          className="font-display mt-2"
          style={{ fontSize: 64, lineHeight: 0.95, letterSpacing: "-0.03em" }}
        >
          Anatomy of a{" "}
          <em style={{ color: "var(--color-seal-deep)" }}>TrustLink.</em>
        </h2>
        <p className="mt-4 max-w-2xl text-ink-2" style={{ fontSize: 17 }}>
          Every TrustLink is a sealed document. Here's what's stamped on it.
        </p>
      </div>
      <div className="grid items-start gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <TrustLinkCardLarge />
        </div>
        <div className="lg:col-span-5">
          <ul className="space-y-6">
            {[
              ["Trust Passport", "Reputation, verification level, completed transactions, dispute rate. The seller earns it; the buyer reads it."],
              ["Locked Product Proof", "Live photos and short video taken in-app. Cannot be silently edited after payment."],
              ["Transparent fee line", "Platform fee shown before payment, not after. Trust starts with no surprises."],
              ["Protected Payment ribbon", "States the rule of escrow in plain language: held until delivery confirmed."],
              ["Two CTAs only", "Confirm & Pay or Request Changes. Disagreement is a first-class action, not a dead end."],
            ].map(([k, v]) => (
              <li key={k} className="grid grid-cols-[80px_1fr] gap-6">
                <div className="tiny-caps text-protected pt-1">
                  {k.split(" ")[0]}
                </div>
                <div>
                  <div
                    className="font-display text-ink"
                    style={{ fontSize: 21, lineHeight: 1.2 }}
                  >
                    {k}
                  </div>
                  <div className="mt-1 text-sm text-ink-2">{v}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ==================================================================
   DISPUTE BRANCH
   ================================================================== */
function DisputeBranch() {
  return (
    <section className="border-t border-line bg-paper-2/30 py-32">
      <div className="mx-auto max-w-[1320px] px-8 lg:px-14">
        <div className="mb-16 grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="tiny-caps text-clay">Chapter III · The branch</div>
            <h2
              className="font-display mt-2"
              style={{ fontSize: 64, lineHeight: 0.95, letterSpacing: "-0.03em" }}
            >
              When something goes{" "}
              <em style={{ color: "var(--color-clay)" }}>wrong.</em>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-ink-2" style={{ fontSize: 17, lineHeight: 1.55 }}>
              Disputes are where escrow products are made or broken. SolicePay
              keeps the funds frozen, hands both sides an evidence room, and
              gives the operations team a clean dossier to review.
            </p>
          </div>
        </div>

        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div className="flex flex-col items-center">
            <Phone
              caption="Buyer raises an issue with evidence — funds remain frozen"
              step="A"
            >
              <ScreenIssueReport />
            </Phone>
          </div>
          <div className="flex flex-col items-center">
            <Phone
              caption="Seller has 24h to respond — accept, replace, or counter"
              step="B"
            >
              <ScreenSellerResponse />
            </Phone>
          </div>
        </div>

        <div className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Full refund", "to buyer", "clay"],
            ["Partial refund", "split settlement", "clay"],
            ["Replacement", "or return required", "ink"],
            ["Release to seller", "claim dismissed", "protected"],
          ].map(([t, sub, tone]) => (
            <div
              key={t}
              className="paper rounded-2xl p-5"
              style={{ borderLeft: `4px solid var(--color-${tone})` }}
            >
              <div
                className="tiny-caps"
                style={{ color: `var(--color-${tone})` }}
              >
                Outcome
              </div>
              <div
                className="font-display mt-2 text-ink"
                style={{ fontSize: 22, lineHeight: 1.1 }}
              >
                {t}
              </div>
              <div className="mt-1 text-sm text-ink-3">{sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==================================================================
   FOOTER
   ================================================================== */
function ClosingFooter() {
  return (
    <footer className="border-t border-line bg-ink text-paper">
      <div className="mx-auto grid max-w-[1320px] gap-12 px-8 py-20 lg:grid-cols-12 lg:px-14">
        <div className="lg:col-span-5">
          <Wordmark size={32} tone="paper" />
          <p
            className="mt-8 max-w-md text-paper/70"
            style={{ fontSize: 17, lineHeight: 1.6 }}
          >
            <em className="font-display" style={{ fontStyle: "italic" }}>
              Your money is protected
            </em>{" "}
            until the deal is done. SolicePay is the trust intelligence layer
            on top of the social commerce that already happens — every day, in
            every chat.
          </p>
        </div>
        <div className="lg:col-span-3">
          <div className="tiny-caps text-paper/50">The product</div>
          <ul className="mt-4 space-y-2 text-paper/85">
            <li>TrustLink</li>
            <li>Trust Passport</li>
            <li>Product Proof Room</li>
            <li>Protected Payment</li>
            <li>Dispute Resolution</li>
          </ul>
        </div>
        <div className="lg:col-span-2">
          <div className="tiny-caps text-paper/50">Rails</div>
          <ul className="mt-4 space-y-2 text-paper/85">
            <li>Flutterwave Escrow</li>
            <li>Internal Ledger</li>
            <li>State Machine</li>
          </ul>
        </div>
        <div className="lg:col-span-2 flex flex-col items-end justify-between">
          <BrandSeal size={92} tone="gold" spin />
          <div className="tiny-caps mt-6 text-paper/50">
            № 001 · Demo build
          </div>
        </div>
      </div>
      <div className="border-t border-paper/10 py-4 text-center tiny-caps text-paper/40">
        SOLICEPAY · MMXXVI · STAMPED, SEALED, SETTLED
      </div>
    </footer>
  );
}

/* ==================================================================
   RE-USED MICRO COMPONENTS
   ================================================================== */
function ScreenHeader({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="flex items-center justify-between border-b border-line px-5 py-3">
      <button className="text-ink-3">
        <PiArrowLeft size={18} />
      </button>
      <div className="text-center">
        <div
          className="font-display text-ink"
          style={{ fontSize: 15, fontWeight: 500 }}
        >
          {title}
        </div>
        {sub && (
          <div className="tiny-caps text-ink-3" style={{ fontSize: 9 }}>
            {sub}
          </div>
        )}
      </div>
      <span className="tiny-caps text-ink-3" style={{ fontSize: 9 }}>
        SLC-9F3K2
      </span>
    </div>
  );
}

function StatusTimeline({ active }: { active: number }) {
  const steps = ["Created", "Reviewed", "Paid", "Protected", "Dispatched", "Confirmed", "Released"];
  return (
    <div className="flex items-center gap-1.5 px-5">
      {steps.map((s, i) => {
        const isActive = i <= active;
        return (
          <div key={s} className="flex flex-1 flex-col items-center gap-1">
            <div
              className="h-1 w-full rounded-full"
              style={{
                background: isActive ? "var(--color-protected)" : "var(--color-paper-3)",
              }}
            />
            <span
              className="tiny-caps"
              style={{
                fontSize: 7,
                color: isActive ? "var(--color-ink)" : "var(--color-ink-4)",
              }}
            >
              {s.slice(0, 4)}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function MoneyRow({
  label,
  amount,
  mute = false,
  bold = false,
}: {
  label: string;
  amount: string;
  mute?: boolean;
  bold?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between py-2 ${mute ? "text-ink-3" : "text-ink"}`}
    >
      <span style={{ fontSize: 13 }}>{label}</span>
      <span
        className={`numeric ${bold ? "font-display" : "font-mono"}`}
        style={{ fontSize: bold ? 17 : 13 }}
      >
        {amount}
      </span>
    </div>
  );
}

function VerifiedPill({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full border border-protected/30 bg-protected-soft/50 px-2 py-0.5 text-protected"
      style={{ fontSize: 10 }}
    >
      <PiSealCheckFill size={10} /> {children}
    </span>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-line bg-paper-2/30 px-3 py-2.5">
      <div className="tiny-caps text-ink-3" style={{ fontSize: 9 }}>
        {label}
      </div>
      <div className="mt-0.5">{children}</div>
    </div>
  );
}

function Stat({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub: React.ReactNode;
}) {
  return (
    <div>
      <div className="tiny-caps text-ink-3" style={{ fontSize: 9 }}>
        {label}
      </div>
      <div
        className="font-display text-ink mt-0.5"
        style={{ fontSize: 18, lineHeight: 1 }}
      >
        {value}
      </div>
      <div className="tiny-caps text-ink-3 mt-0.5" style={{ fontSize: 8 }}>
        {sub}
      </div>
    </div>
  );
}

/* ==================================================================
   PHONE SCREENS — content rendered inside <Phone>
   ================================================================== */

/* ----- 01: Seller creates the TrustLink ----- */
function ScreenSellerCreate() {
  return (
    <Phone
      step="01"
      caption="Seller fills the offer + captures Live Proof inside the app"
    >
      <ScreenHeader title="New TrustLink" sub="Draft" />
      <div className="flex-1 overflow-auto px-5 py-4 no-scrollbar">
        <div className="flex items-center justify-between">
          <span className="tiny-caps text-ink-3">I'm</span>
          <div className="inline-flex rounded-full border border-line bg-paper p-0.5">
            <span className="rounded-full px-3 py-1 text-xs text-ink-3">Buying</span>
            <span className="rounded-full bg-ink px-3 py-1 text-xs text-paper">Selling</span>
          </div>
        </div>

        <div className="mt-5 space-y-3.5">
          <Field label="Product">
            <div className="font-display text-ink" style={{ fontSize: 16 }}>
              iPhone 15 Pro Max — Natural Titanium
            </div>
            <div className="tiny-caps mt-0.5 text-ink-3">
              256GB · Sealed box
            </div>
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Price">
              <span
                className="font-mono numeric text-ink"
                style={{ fontSize: 15 }}
              >
                ₦1,250,000
              </span>
            </Field>
            <Field label="Delivery fee">
              <span
                className="font-mono numeric text-ink"
                style={{ fontSize: 15 }}
              >
                ₦5,000
              </span>
            </Field>
          </div>

          <div>
            <div className="tiny-caps mb-2 text-ink-3">Live Proof — required</div>
            <div className="grid grid-cols-4 gap-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="aspect-square rounded-lg border border-line bg-gradient-to-br from-paper-2 to-paper-3 relative overflow-hidden"
                >
                  <div className="absolute inset-0 flex items-center justify-center text-ink-3">
                    <PiCameraFill size={20} />
                  </div>
                  <div className="absolute right-1 top-1 rounded-full bg-protected p-0.5 text-paper">
                    <PiCheck size={9} />
                  </div>
                </div>
              ))}
              <div className="aspect-square rounded-lg border border-line bg-gradient-to-br from-paper-2 to-paper-3 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-ink-3">
                  <PiVideoCameraFill size={20} />
                </div>
                <div className="absolute right-1 top-1 rounded-full bg-protected p-0.5 text-paper">
                  <PiCheck size={9} />
                </div>
              </div>
            </div>
            <div className="tiny-caps mt-2 text-protected flex items-center gap-1">
              <PiLockKeyFill size={10} /> Locked at 14:22 — cannot be silently edited
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-line p-4">
        <button className="w-full rounded-2xl bg-ink py-3.5 text-center text-paper">
          <span className="font-display" style={{ fontSize: 15 }}>
            Generate TrustLink
          </span>
        </button>
      </div>
    </Phone>
  );
}

/* ----- 02: Share the TrustLink ----- */
function ScreenShare() {
  const channels = [
    { Icon: FaWhatsapp, name: "WhatsApp", color: "#25D366" },
    { Icon: FaInstagram, name: "Instagram", color: "#E1306C" },
    { Icon: FaTiktok, name: "TikTok", color: "#0e0f12" },
    { Icon: FaTelegramPlane, name: "Telegram", color: "#229ED9" },
    { Icon: FaFacebookMessenger, name: "Messenger", color: "#0084FF" },
    { Icon: PiPaperPlaneTiltFill, name: "More", color: "#5d5f68" },
  ];
  return (
    <Phone step="02" caption="Generated link, ready to drop into any chat">
      <ScreenHeader title="TrustLink ready" />
      <div className="flex-1 overflow-auto px-5 py-4 no-scrollbar">
        <div className="rise flex flex-col items-center text-center">
          <div className="my-1 inline-flex items-center gap-2 rounded-full bg-protected-soft px-3 py-1 text-protected">
            <PiSealCheckFill size={12} /> <span className="tiny-caps">Sealed</span>
          </div>
          <h3
            className="font-display mt-2"
            style={{ fontSize: 22, lineHeight: 1.1, letterSpacing: "-0.01em" }}
          >
            Send to your buyer
          </h3>
          <p className="mt-1 px-4 text-xs text-ink-3">
            Money is held in escrow the moment they pay
          </p>
        </div>

        <div className="mt-5 rounded-2xl border border-line bg-paper px-3 py-3">
          <div className="tiny-caps text-ink-3">TrustLink URL</div>
          <div className="mt-1 flex items-center justify-between gap-2">
            <span
              className="font-mono truncate text-ink"
              style={{ fontSize: 12 }}
            >
              solicepay.app/t/SLC-9F3K2
            </span>
            <button className="rounded-md bg-ink px-2 py-1 text-paper">
              <PiCopy size={12} />
            </button>
          </div>
        </div>

        <div className="mt-3 overflow-hidden rounded-2xl border border-line bg-paper">
          <div className="flex items-center gap-3 px-3 py-2.5">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-seal to-seal-deep" />
            <div className="flex-1">
              <div className="font-display text-ink" style={{ fontSize: 13 }}>
                Lara is selling iPhone 15 Pro Max
              </div>
              <div className="tiny-caps text-ink-3" style={{ fontSize: 9 }}>
                ₦1,255,000 · Lagos
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

        <div className="mt-5 grid grid-cols-3 gap-3">
          {channels.map(({ Icon, name, color }) => (
            <button
              key={name}
              className="flex flex-col items-center gap-1.5 rounded-2xl border border-line bg-paper py-3"
            >
              <Icon size={22} color={color} />
              <span className="tiny-caps text-ink-3" style={{ fontSize: 9 }}>
                {name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </Phone>
  );
}

/* ----- 03: Buyer reviews TrustLink ----- */
function ScreenBuyerReview() {
  return (
    <Phone
      step="03"
      caption="Trust Passport first, price second — the order matters"
    >
      <ScreenHeader title="TrustLink offer" sub="From Lara A." />
      <div className="flex-1 overflow-auto no-scrollbar">
        <div className="mx-4 mt-3 rounded-2xl border border-line bg-paper p-3">
          <div className="flex items-start gap-3">
            <div className="relative">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-seal to-seal-deep" />
              <div className="absolute -right-1 -bottom-1 rounded-full bg-paper p-0.5">
                <PiSealCheckFill className="text-protected" size={14} />
              </div>
            </div>
            <div className="flex-1">
              <div className="font-display text-ink" style={{ fontSize: 16 }}>
                Lara Adekunle
              </div>
              <div className="tiny-caps text-ink-3" style={{ fontSize: 9 }}>
                Lara's Tech Lounge · Lagos
              </div>
              <div className="mt-1 flex flex-wrap gap-1">
                <VerifiedPill>ID</VerifiedPill>
                <VerifiedPill>Business</VerifiedPill>
                <VerifiedPill>Bank</VerifiedPill>
              </div>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 border-t border-line pt-3 text-center">
            <Stat
              label="Trust Score"
              value="4.84"
              sub={
                <span className="text-seal-deep flex items-center justify-center gap-0.5">
                  <PiStarFill size={9} />/5
                </span>
              }
            />
            <Stat label="Sales" value="142" sub="completed" />
            <Stat label="Delivery" value="99.3%" sub="on time" />
          </div>
        </div>

        <div className="mt-3 px-4">
          <div className="tiny-caps mb-1.5 flex items-center gap-1 text-protected">
            <PiLockKeyFill size={10} /> Locked product proof
          </div>
          <div className="grid grid-cols-4 gap-1.5">
            <div className="col-span-2 row-span-2 aspect-square rounded-lg bg-gradient-to-br from-ink/80 to-ink-2 relative">
              <div className="absolute inset-0 flex items-center justify-center text-paper/30 text-4xl font-display italic">
                iP
              </div>
            </div>
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="aspect-square rounded-lg bg-gradient-to-br from-paper-2 to-paper-3"
              />
            ))}
          </div>
          <div
            className="font-display mt-2 text-ink"
            style={{ fontSize: 17, lineHeight: 1.2 }}
          >
            iPhone 15 Pro Max — Natural Titanium
          </div>
          <div className="tiny-caps text-ink-3">
            256GB · Sealed box · 1yr Apple warranty
          </div>
        </div>

        <div className="mx-4 mt-3 rounded-2xl border border-line bg-paper-2/30 px-3 py-2">
          <MoneyRow label="Subtotal" amount="₦1,250,000" mute />
          <MoneyRow label="Delivery (Lagos)" amount="₦5,000" mute />
          <MoneyRow label="Platform fee · 1.2%" amount="₦15,060" mute />
          <div className="mt-1 border-t border-line pt-1">
            <MoneyRow label="Total to protect" amount="₦1,270,060" bold />
          </div>
        </div>

        <div className="mx-4 mt-3 rounded-xl border border-protected/40 bg-protected-soft/50 px-3 py-2 text-protected">
          <div className="flex items-center gap-2">
            <PiShieldCheckFill size={16} />
            <div>
              <div className="font-display" style={{ fontSize: 12 }}>
                Money held in escrow
              </div>
              <div className="tiny-caps" style={{ fontSize: 8 }}>
                Released only after you confirm delivery
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-line p-3 space-y-2">
        <button className="w-full rounded-2xl bg-ink py-3 text-paper">
          <span className="font-display" style={{ fontSize: 14 }}>
            Confirm & Pay{" "}
          </span>
          <span className="font-mono numeric" style={{ fontSize: 13 }}>
            ₦1,270,060
          </span>
        </button>
        <button className="w-full rounded-2xl border border-line bg-paper py-2.5 text-ink">
          <span className="text-xs">Request changes</span>
        </button>
      </div>
    </Phone>
  );
}

/* ----- 04: Pay (Flutterwave) ----- */
function ScreenPay() {
  return (
    <Phone step="04" caption="Flutterwave handles the rail — SolicePay tells it to hold">
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between px-5 pt-3 pb-2">
          <button className="text-ink-3"><PiArrowLeft size={18} /></button>
          <div className="tiny-caps text-ink-3">Pay & Protect</div>
          <span className="tiny-caps text-ink-3" style={{ fontSize: 9 }}>SLC-9F3K2</span>
        </div>
        <div className="flex-1 overflow-auto no-scrollbar px-5">
          <div className="rounded-2xl border border-line bg-paper p-4 text-center">
            <div className="tiny-caps text-ink-3">Amount to protect</div>
            <div
              className="font-display mt-1 text-ink"
              style={{ fontSize: 36, lineHeight: 1, letterSpacing: "-0.02em" }}
            >
              <span className="font-mono numeric">₦1,270,060</span>
            </div>
            <div className="mt-3 flex items-center justify-center gap-1 tiny-caps text-protected">
              <PiLockKeyFill size={11} /> Held in escrow until delivery
            </div>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2">
            {["Card", "Bank", "USSD"].map((m, i) => (
              <button
                key={m}
                className={`rounded-xl border py-2 text-xs ${i === 0 ? "border-ink bg-ink text-paper" : "border-line bg-paper text-ink"}`}
              >
                {m}
              </button>
            ))}
          </div>

          <div className="mt-3 space-y-2">
            <Field label="Card number">
              <span className="font-mono text-ink" style={{ fontSize: 13 }}>
                4556  ••••  ••••  3902
              </span>
            </Field>
            <div className="grid grid-cols-2 gap-2">
              <Field label="Expiry">
                <span className="font-mono text-ink text-sm">09 / 28</span>
              </Field>
              <Field label="CVV">
                <span className="font-mono text-ink text-sm">•••</span>
              </Field>
            </div>
          </div>

          <div className="mt-3 rounded-xl bg-paper-2/40 p-2.5 text-xs text-ink-3">
            By paying you accept SolicePay's protection terms. Funds release on
            confirmed delivery or 48h after delivery proof.
          </div>
        </div>
        <div className="border-t border-line p-3">
          <button className="w-full rounded-2xl bg-protected py-3.5 text-paper">
            <span className="font-display" style={{ fontSize: 14 }}>
              Pay & Protect{" "}
            </span>
            <span className="font-mono numeric ml-1" style={{ fontSize: 13 }}>
              ₦1,270,060
            </span>
          </button>
          <div className="mt-2 flex items-center justify-center gap-1.5 tiny-caps text-ink-3" style={{ fontSize: 9 }}>
            Powered by <SiFlutter size={11} className="text-[#F5A623]" /> Flutterwave Escrow
          </div>
        </div>
      </div>
    </Phone>
  );
}

/* ----- 05: Payment Protected (toggleable) ----- */
function ScreenProtected({ view }: { view: "buyer" | "seller" }) {
  return (
    <Phone caption={view === "buyer" ? "Buyer's view — your money is safe" : "Seller's view — buyer is committed"}>
      <ScreenHeader
        title="TrustLink #SLC-9F3K2"
        sub={view === "buyer" ? "You are the buyer" : "You are the seller"}
      />
      <div className="flex flex-1 flex-col items-center px-5 pt-5 overflow-auto no-scrollbar">
        <div className="relative">
          <div className="absolute inset-0 rounded-full pulse-ring" />
          <div className="rounded-full bg-protected p-5 text-paper">
            <PiShieldCheckFill size={40} />
          </div>
        </div>
        <div className="mt-5 text-center">
          <div className="tiny-caps text-protected">Step 4 of 7 · Protected</div>
          <h3
            className="font-display mt-1.5"
            style={{ fontSize: 24, lineHeight: 1.05, letterSpacing: "-0.01em" }}
          >
            {view === "buyer" ? (
              <>Your money is{" "}
                <em style={{ color: "var(--color-protected)" }}>protected.</em>
              </>
            ) : (
              <>Buyer paid. Funds{" "}
                <em style={{ color: "var(--color-protected)" }}>held safely.</em>
              </>
            )}
          </h3>
          <p className="mt-2 px-2 text-xs text-ink-3">
            {view === "buyer"
              ? "Lara only receives ₦1,255,000 once you confirm delivery."
              : "Tunde's ₦1,270,060 sits in escrow. Ship the product to release."}
          </p>
        </div>

        <div className="mt-4 w-full rounded-2xl border border-line bg-paper px-3 py-3">
          <MoneyRow label="Held in escrow" amount="₦1,270,060" bold />
          <div
            className="mt-1 flex items-center justify-between tiny-caps text-ink-3"
            style={{ fontSize: 9 }}
          >
            <span>Auto-release in</span>
            <span>· · ·</span>
          </div>
        </div>

        <div className="mt-4 w-full">
          <StatusTimeline active={3} />
        </div>

        <div className="mt-5 w-full rounded-xl bg-paper-2/40 px-3 py-2 text-xs text-ink-3">
          {view === "buyer" ? (
            <>If delivery doesn't match the proof, tap{" "}
              <span className="text-clay font-medium">Report an issue</span>{" "}
              to freeze release.
            </>
          ) : (
            <>Once you mark dispatched and Tunde confirms, funds settle to your bank within minutes.</>
          )}
        </div>
      </div>
      <div className="border-t border-line p-3">
        <button className="w-full rounded-2xl bg-ink py-3 text-paper">
          <span className="font-display" style={{ fontSize: 14 }}>
            {view === "buyer" ? "View transaction" : "Mark as dispatched"}
          </span>
        </button>
      </div>
    </Phone>
  );
}

/* ----- 06: Seller dispatches ----- */
function ScreenDispatch() {
  return (
    <Phone step="06" caption="Lara uploads the waybill — the link advances">
      <ScreenHeader title="Mark as dispatched" />
      <div className="flex-1 overflow-auto px-5 py-4 no-scrollbar space-y-3">
        <div className="space-y-2">
          <Field label="Courier">
            <div className="font-display text-ink" style={{ fontSize: 14 }}>
              GIG Logistics
            </div>
          </Field>
          <Field label="Tracking number">
            <span className="font-mono text-ink" style={{ fontSize: 13 }}>
              GIGL-7820-X4K
            </span>
          </Field>
          <div className="grid grid-cols-2 gap-2">
            <Field label="Dispatched">
              <span className="font-mono text-ink text-xs">15 May, 11:30</span>
            </Field>
            <Field label="ETA">
              <span className="font-mono text-ink text-xs">17 May</span>
            </Field>
          </div>
        </div>

        <div>
          <div className="tiny-caps mb-1.5 text-ink-3">Dispatch proof</div>
          <div className="rounded-2xl border border-line bg-gradient-to-br from-paper-2 to-paper-3 p-4">
            <div className="aspect-[4/3] rounded-lg bg-gradient-to-br from-ink/70 to-ink-2 relative">
              <div
                className="absolute right-2 top-2 rounded-full bg-protected px-2 py-0.5 tiny-caps text-paper"
                style={{ fontSize: 8 }}
              >
                Waybill
              </div>
              <div
                className="absolute bottom-2 left-2 tiny-caps text-paper/60"
                style={{ fontSize: 8 }}
              >
                IMG_8231 · 11:34
              </div>
            </div>
            <button className="mt-2 flex w-full items-center justify-center gap-1.5 text-xs text-ink-3">
              <PiUploadSimple size={12} /> Add another photo
            </button>
          </div>
        </div>

        <div className="rounded-xl bg-protected-soft/50 p-2.5 text-protected">
          <div className="flex items-start gap-2">
            <PiPackageFill size={14} className="mt-0.5" />
            <div className="text-xs">
              Tunde will be notified instantly. He can also upload a delivery photo on arrival.
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-line p-3">
        <button className="w-full rounded-2xl bg-ink py-3.5 text-paper">
          <span className="font-display" style={{ fontSize: 14 }}>
            Mark as dispatched
          </span>
        </button>
      </div>
    </Phone>
  );
}

/* ----- 07: Buyer confirms ----- */
function ScreenConfirm() {
  return (
    <Phone
      step="07"
      caption="Three honest options — silence becomes auto-release after 48h"
    >
      <ScreenHeader title="How is your order?" />
      <div className="flex-1 overflow-auto px-5 py-4 no-scrollbar">
        <div className="rounded-2xl border border-line bg-paper p-3">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-ink/70 to-ink-2" />
            <div className="flex-1">
              <div className="font-display text-ink" style={{ fontSize: 14 }}>
                iPhone 15 Pro Max
              </div>
              <div className="tiny-caps text-ink-3" style={{ fontSize: 9 }}>
                Delivered · 17 May, 14:02
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-2.5">
          <ChoiceRow
            tone="protected"
            Icon={PiCheckCircleFill}
            title="Received & all good"
            sub="Release ₦1,255,000 to Lara now"
          />
          <ChoiceRow
            tone="clay"
            Icon={PiWarningOctagonFill}
            title="Received with an issue"
            sub="Open evidence room, freeze release"
          />
          <ChoiceRow
            tone="ink-3"
            Icon={PiXCircleFill}
            title="I haven't received it"
            sub="Notify Lara — tracking last seen 16 May"
          />
        </div>

        <div className="mt-5 rounded-xl bg-paper-2/40 px-3 py-2.5 text-xs text-ink-3">
          <div className="tiny-caps text-ink-3" style={{ fontSize: 9 }}>
            Auto-release timer
          </div>
          <div className="mt-1 flex items-center justify-between">
            <span className="font-mono text-ink">47:42:18</span>
            <span>If no action with valid delivery proof</span>
          </div>
        </div>
      </div>
    </Phone>
  );
}

function ChoiceRow({
  tone,
  Icon,
  title,
  sub,
}: {
  tone: string;
  Icon: any;
  title: string;
  sub: string;
}) {
  return (
    <button
      className="flex w-full items-start gap-3 rounded-2xl border bg-paper p-3 text-left"
      style={{ borderColor: `var(--color-${tone})` }}
    >
      <Icon
        size={20}
        style={{ color: `var(--color-${tone})` }}
        className="mt-0.5"
      />
      <div className="flex-1">
        <div className="font-display text-ink" style={{ fontSize: 14 }}>
          {title}
        </div>
        <div className="tiny-caps text-ink-3 mt-0.5" style={{ fontSize: 9 }}>
          {sub}
        </div>
      </div>
      <PiArrowRight className="mt-1.5 text-ink-3" size={14} />
    </button>
  );
}

/* ----- 08: Receipt ----- */
function ScreenReceipt() {
  return (
    <Phone
      step="08"
      caption="The seal closes the deal — receipt and Trust Score updates"
    >
      <ScreenHeader title="Settled" sub="Released to seller" />
      <div className="flex-1 overflow-auto no-scrollbar receipt-rule">
        <div className="px-5 py-4 relative">
          <div
            className="absolute right-3 top-3 -rotate-12 stamp-frame"
            style={{ color: "var(--color-protected)" }}
          >
            <PiSealCheckFill /> Released
          </div>

          <div className="tiny-caps text-ink-3">SolicePay receipt</div>
          <div className="font-mono text-ink mt-0.5" style={{ fontSize: 11 }}>
            SLC-9F3K2-LARA
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div>
              <div className="tiny-caps text-ink-3">Buyer</div>
              <div className="font-display text-ink" style={{ fontSize: 14 }}>
                Tunde Bello
              </div>
            </div>
            <div>
              <div className="tiny-caps text-ink-3">Seller</div>
              <div className="font-display text-ink" style={{ fontSize: 14 }}>
                Lara Adekunle
              </div>
            </div>
          </div>

          <div className="mt-3 border-t border-line pt-2">
            <MoneyRow label="iPhone 15 Pro Max" amount="₦1,250,000" />
            <MoneyRow label="Delivery · GIG" amount="₦5,000" mute />
            <MoneyRow label="Platform fee · 1.2%" amount="₦15,060" mute />
            <div className="border-t border-line my-2" />
            <MoneyRow label="Buyer paid" amount="₦1,270,060" bold />
            <MoneyRow label="Settled to seller" amount="₦1,255,000" />
          </div>

          <div className="mt-3 rounded-xl bg-paper-2/40 px-3 py-2 text-xs">
            <div className="tiny-caps text-ink-3">Timeline</div>
            <div className="mt-1 grid grid-cols-2 gap-y-0.5 text-xs text-ink-2">
              <span className="text-ink-3">Created</span>
              <span className="font-mono text-right">14 May, 14:22</span>
              <span className="text-ink-3">Paid</span>
              <span className="font-mono text-right">14 May, 15:05</span>
              <span className="text-ink-3">Dispatched</span>
              <span className="font-mono text-right">15 May, 11:34</span>
              <span className="text-ink-3">Delivered</span>
              <span className="font-mono text-right">17 May, 14:02</span>
              <span className="text-protected font-medium">Released</span>
              <span className="font-mono text-right">17 May, 14:11</span>
            </div>
          </div>

          <div className="mt-3 rounded-xl border border-line bg-paper p-3">
            <div className="tiny-caps mb-2 text-ink-3">Trust Score updated</div>
            <div className="space-y-1.5">
              <ScoreRow name="Lara A." value="4.84 → 4.85" />
              <ScoreRow name="Tunde B." value="4.71 → 4.72" />
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center">
            <BrandSeal size={70} tone="ink" />
          </div>
          <div
            className="mt-2 text-center tiny-caps text-ink-3"
            style={{ fontSize: 8 }}
          >
            Stamped, sealed, settled — solicepay.app
          </div>
        </div>
      </div>
    </Phone>
  );
}

function ScoreRow({ name, value }: { name: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-xs">
      <span className="text-ink">{name}</span>
      <span className="font-mono text-protected">{value}</span>
    </div>
  );
}

/* ==================================================================
   ANATOMY — large TrustLink card
   ================================================================== */
function TrustLinkCardLarge() {
  return (
    <div className="paper rounded-3xl p-6 lg:p-8">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <BrandSeal size={48} tone="gold" />
          <div>
            <div className="tiny-caps text-ink-3">TrustLink</div>
            <div className="font-mono text-ink" style={{ fontSize: 13 }}>
              SLC-9F3K2-LARA
            </div>
          </div>
        </div>
        <span className="stamp-frame text-protected">
          <PiShieldCheckFill /> Protected
        </span>
      </div>

      <div className="my-6 rule" />

      <div className="grid gap-6 md:grid-cols-[auto_1fr]">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-seal to-seal-deep" />
            <div className="absolute -right-1 -bottom-1 rounded-full bg-paper p-0.5">
              <PiSealCheckFill className="text-protected" size={16} />
            </div>
          </div>
          <div>
            <div className="font-display text-ink" style={{ fontSize: 22 }}>
              Lara Adekunle
            </div>
            <div className="tiny-caps text-ink-3">
              Lara's Tech Lounge · Verified
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              <VerifiedPill>ID</VerifiedPill>
              <VerifiedPill>Business</VerifiedPill>
              <VerifiedPill>Bank</VerifiedPill>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 border-l border-line pl-6">
          <Stat
            label="Trust Score"
            value="4.84"
            sub={
              <span className="text-seal-deep flex items-center gap-0.5">
                <PiStarFill size={9} /> /5
              </span>
            }
          />
          <Stat label="Sales" value="142" sub="completed" />
          <Stat label="Delivery" value="99.3%" sub="on time" />
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-[200px_1fr]">
        <div className="aspect-square rounded-xl bg-gradient-to-br from-ink/80 to-ink-2 relative">
          <div className="absolute inset-0 flex items-center justify-center text-paper/30 text-6xl font-display italic">
            iP
          </div>
          <div
            className="absolute right-2 top-2 stamp-frame text-paper bg-ink/60 backdrop-blur-sm"
            style={{ fontSize: 9 }}
          >
            <PiLockKeyFill /> LOCKED
          </div>
        </div>
        <div>
          <div
            className="font-display text-ink"
            style={{ fontSize: 26, lineHeight: 1.1, letterSpacing: "-0.01em" }}
          >
            iPhone 15 Pro Max — Natural Titanium
          </div>
          <div className="tiny-caps mt-1 text-ink-3">
            256GB · Sealed box · 1yr Apple warranty
          </div>

          <div className="mt-4 rounded-xl bg-paper-2/40 px-4 py-3">
            <MoneyRow label="Subtotal" amount="₦1,250,000" mute />
            <MoneyRow label="Delivery · Lagos" amount="₦5,000" mute />
            <MoneyRow label="Platform fee · 1.2%" amount="₦15,060" mute />
            <div className="border-t border-line my-1" />
            <MoneyRow label="Total to protect" amount="₦1,270,060" bold />
          </div>

          <div className="mt-3 rounded-xl border border-protected/40 bg-protected-soft/40 px-4 py-2.5 text-protected flex items-center gap-2">
            <PiShieldCheckFill size={18} />
            <div>
              <div className="font-display" style={{ fontSize: 14 }}>
                Money held in escrow
              </div>
              <div className="tiny-caps" style={{ fontSize: 9 }}>
                Released only after delivery confirmed
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button className="rounded-full bg-ink px-5 py-2.5 text-paper text-sm">
              Confirm & Pay ₦1,270,060
            </button>
            <button className="rounded-full border border-line bg-paper px-5 py-2.5 text-ink text-sm">
              Request changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==================================================================
   DISPUTE BRANCH SCREENS
   ================================================================== */
function ScreenIssueReport() {
  return (
    <>
      <ScreenHeader title="Report an issue" sub="Funds remain frozen" />
      <div className="flex-1 overflow-auto px-5 py-4 no-scrollbar">
        <div className="rounded-xl bg-clay-soft px-3 py-2 text-clay flex items-center gap-2">
          <PiWarningOctagonFill size={16} />
          <div className="text-xs">
            Lara has 24h to respond. Money stays in escrow until resolved.
          </div>
        </div>

        <div className="mt-3">
          <div className="tiny-caps mb-1.5 text-ink-3">What's wrong?</div>
          <div className="space-y-1.5">
            {[
              ["Wrong item", false],
              ["Damaged on arrival", true],
              ["Not as described", false],
              ["Item missing parts", false],
              ["Fake / counterfeit", false],
            ].map(([label, active]) => (
              <button
                key={label as string}
                className={`flex w-full items-center justify-between rounded-xl border px-3 py-2 text-sm ${active ? "border-clay bg-clay-soft text-clay" : "border-line bg-paper text-ink"}`}
              >
                <span>{label as string}</span>
                {active && <PiCheck size={14} />}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-3">
          <div className="tiny-caps mb-1.5 text-ink-3">Your evidence</div>
          <div className="grid grid-cols-3 gap-1.5">
            {[0, 1].map((i) => (
              <div
                key={i}
                className="aspect-square rounded-lg bg-gradient-to-br from-paper-2 to-paper-3 relative"
              >
                <div className="absolute right-1 top-1 rounded-full bg-clay p-0.5 text-paper">
                  <PiCheck size={9} />
                </div>
              </div>
            ))}
            <button className="aspect-square rounded-lg border border-dashed border-line text-ink-3 flex items-center justify-center">
              <PiCameraFill size={18} />
            </button>
          </div>
        </div>

        <div className="mt-3 rounded-xl border border-line bg-paper-2/30 px-3 py-2 text-xs text-ink-2">
          <div className="tiny-caps text-ink-3">Note to seller</div>
          <div className="mt-1 italic">
            "The screen has a 2cm scratch from corner to centre. Picture taken
            right out of the packaging."
          </div>
        </div>
      </div>
      <div className="border-t border-line p-3">
        <button className="w-full rounded-2xl bg-clay py-3 text-paper">
          <span className="font-display" style={{ fontSize: 14 }}>
            Submit issue · Freeze release
          </span>
        </button>
      </div>
    </>
  );
}

function ScreenSellerResponse() {
  return (
    <>
      <ScreenHeader
        title="Issue raised by Tunde"
        sub="Respond within 23:42:11"
      />
      <div className="flex-1 overflow-auto px-5 py-4 no-scrollbar">
        <div className="rounded-xl bg-clay-soft px-3 py-2 text-clay">
          <div className="tiny-caps">Damaged on arrival</div>
          <div className="text-xs italic mt-1">
            "The screen has a 2cm scratch from corner to centre…"
          </div>
        </div>

        <div className="mt-3">
          <div className="tiny-caps mb-1.5 text-ink-3">Buyer's evidence</div>
          <div className="grid grid-cols-3 gap-1.5">
            {[0, 1].map((i) => (
              <div
                key={i}
                className="aspect-square rounded-lg bg-gradient-to-br from-paper-2 to-paper-3"
              />
            ))}
          </div>
        </div>

        <div className="mt-3">
          <div className="tiny-caps mb-1.5 text-ink-3">
            Your locked product proof
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="aspect-square rounded-lg bg-gradient-to-br from-ink/70 to-ink-2 relative"
              >
                <div
                  className="absolute left-1 top-1 rounded bg-protected px-1 tiny-caps text-paper"
                  style={{ fontSize: 7 }}
                >
                  LOCKED
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <div className="tiny-caps mb-1.5 text-ink-3">Choose response</div>
          <div className="space-y-1.5">
            <ResponseRow
              label="Accept full refund"
              sub="₦1,270,060 returned to Tunde"
            />
            <ResponseRow
              label="Offer partial refund"
              sub="Suggest ₦150,000 + keep item"
              highlight
            />
            <ResponseRow
              label="Send replacement"
              sub="Within 5 business days"
            />
            <ResponseRow
              label="Contest with evidence"
              sub="Upload counter-proof to admin"
            />
          </div>
        </div>
      </div>
      <div className="border-t border-line p-3">
        <button className="w-full rounded-2xl bg-ink py-3 text-paper">
          <span className="font-display" style={{ fontSize: 14 }}>
            Send response to Tunde
          </span>
        </button>
      </div>
    </>
  );
}

function ResponseRow({
  label,
  sub,
  highlight = false,
}: {
  label: string;
  sub: string;
  highlight?: boolean;
}) {
  return (
    <button
      className={`flex w-full items-center justify-between rounded-xl border px-3 py-2 text-left ${highlight ? "border-ink bg-paper-2/60" : "border-line bg-paper"}`}
    >
      <div>
        <div className="font-display text-ink" style={{ fontSize: 13 }}>
          {label}
        </div>
        <div className="tiny-caps text-ink-3" style={{ fontSize: 9 }}>
          {sub}
        </div>
      </div>
      <PiArrowRight className="text-ink-3" size={14} />
    </button>
  );
}
