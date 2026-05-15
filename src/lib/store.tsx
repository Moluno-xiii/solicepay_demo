import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type {
  BuyerProfile,
  IssueReport,
  SellerProfile,
  TrustLink,
  TrustLinkStatus,
} from "./types";

/* ============================================================
   Dummy data — Lara (seller) and Tunde (buyer)
   ============================================================ */
export const LARA: SellerProfile = {
  id: "lara",
  name: "Lara Adekunle",
  business: "Lara's Tech Lounge",
  city: "Lagos",
  trustScore: 4.84,
  sales: 142,
  deliveryRate: 99.3,
  verifications: ["ID", "Business", "Bank"],
  avatarHue: 38,
};

export const TUNDE: BuyerProfile = {
  id: "tunde",
  name: "Tunde Bello",
  city: "Abuja",
  trustScore: 4.71,
  purchases: 28,
  avatarHue: 215,
};

const SEED_LINK: TrustLink = {
  id: "SLC-9F3K2",
  seller: LARA,
  buyer: TUNDE,
  product: {
    name: "iPhone 15 Pro Max — Natural Titanium",
    subtitle: "256GB · Sealed box · 1yr Apple warranty",
    price: 1_250_000,
    deliveryFee: 5_000,
    proofs: [
      { label: "FRONT", kind: "photo" },
      { label: "BACK", kind: "photo" },
      { label: "BOX", kind: "photo" },
      { label: "VID", kind: "video" },
    ],
    proofLockedAt: "14:22",
  },
  status: "draft",
  timeline: {
    draft: new Date().toISOString(),
  },
  platformFeePct: 1.2,
};

/* ============================================================
   Context
   ============================================================ */
export type DemoRole = "seller" | "buyer";

type StoreState = {
  links: Record<string, TrustLink>;
  role: DemoRole;
};

type StoreApi = StoreState & {
  getLink: (id: string) => TrustLink | undefined;
  upsertLink: (link: TrustLink) => void;
  patchLink: (id: string, patch: Partial<TrustLink>) => void;
  advance: (id: string, status: TrustLinkStatus) => void;
  setRole: (r: DemoRole) => void;
  reset: () => void;
  reportIssue: (id: string, issue: IssueReport) => void;
};

const StoreContext = createContext<StoreApi | null>(null);

const STORAGE_KEY = "solicepay.demo.v1";

function loadInitialState(): StoreState {
  if (typeof window !== "undefined") {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw) as StoreState;
    } catch {
      /* corrupt — fall through to seed */
    }
  }
  return {
    links: { [SEED_LINK.id]: SEED_LINK },
    role: "seller",
  };
}

export function DemoProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<StoreState>(loadInitialState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const api: StoreApi = useMemo(
    () => ({
      ...state,
      getLink: (id) => state.links[id],
      upsertLink: (link) =>
        setState((s) => ({ ...s, links: { ...s.links, [link.id]: link } })),
      patchLink: (id, patch) =>
        setState((s) => {
          const existing = s.links[id];
          if (!existing) return s;
          return {
            ...s,
            links: { ...s.links, [id]: { ...existing, ...patch } },
          };
        }),
      advance: (id, status) =>
        setState((s) => {
          const existing = s.links[id];
          if (!existing) return s;
          return {
            ...s,
            links: {
              ...s.links,
              [id]: {
                ...existing,
                status,
                timeline: {
                  ...existing.timeline,
                  [status]: new Date().toISOString(),
                },
              },
            },
          };
        }),
      reportIssue: (id, issue) =>
        setState((s) => {
          const existing = s.links[id];
          if (!existing) return s;
          return {
            ...s,
            links: {
              ...s.links,
              [id]: {
                ...existing,
                status: "issue_open",
                issue,
                timeline: {
                  ...existing.timeline,
                  issue_open: new Date().toISOString(),
                },
              },
            },
          };
        }),
      setRole: (role) => setState((s) => ({ ...s, role })),
      reset: () =>
        setState({ links: { [SEED_LINK.id]: SEED_LINK }, role: "seller" }),
    }),
    [state],
  );

  return <StoreContext.Provider value={api}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside DemoProvider");
  return ctx;
}

export function useLink(id: string | undefined) {
  const ctx = useStore();
  return id ? ctx.getLink(id) : undefined;
}

/* ============================================================
   Helpers — generate a new TrustLink id like "SLC-A4K7P"
   ============================================================ */
export function makeLinkId() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < 5; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return `SLC-${s}`;
}

export function newDraftLink(overrides?: Partial<TrustLink>): TrustLink {
  return {
    ...SEED_LINK,
    id: makeLinkId(),
    status: "draft",
    timeline: { draft: new Date().toISOString() },
    ...overrides,
  };
}
