export type TrustLinkStatus =
  | "draft"
  | "pending_payment"
  | "protected"
  | "dispatched"
  | "delivered"
  | "released"
  | "issue_open"
  | "refunded";

export type DisputeOutcome =
  | "full_refund"
  | "partial_refund"
  | "replacement"
  | "release_seller";

export type SellerProfile = {
  id: string;
  name: string;
  business: string;
  city: string;
  trustScore: number;
  sales: number;
  deliveryRate: number;
  verifications: ("ID" | "Business" | "Bank" | "Face")[];
  avatarHue: number;
};

export type BuyerProfile = {
  id: string;
  name: string;
  city: string;
  trustScore: number;
  purchases: number;
  avatarHue: number;
};

export type ProductProof = {
  /** label shown in the UI thumbnail (e.g. "iP" "BOX") */
  label: string;
  /** content type — affects icon */
  kind: "photo" | "video";
};

export type TrustLinkProduct = {
  name: string;
  subtitle: string;
  price: number;
  deliveryFee: number;
  proofs: ProductProof[];
  proofLockedAt: string;
};

export type DispatchInfo = {
  courier: string;
  tracking: string;
  dispatchedAt: string;
  eta: string;
};

export type IssueReport = {
  type: string;
  note: string;
  evidenceCount: number;
  raisedAt: string;
  sellerResponse?: {
    kind: "refund" | "partial" | "replacement" | "contest";
    note?: string;
  };
};

export type TrustLink = {
  id: string;
  seller: SellerProfile;
  buyer: BuyerProfile;
  product: TrustLinkProduct;
  status: TrustLinkStatus;
  /** ISO timestamps as the link advances through states */
  timeline: Partial<Record<TrustLinkStatus, string>>;
  dispatch?: DispatchInfo;
  issue?: IssueReport;
  /** percent of total amount that is the platform fee */
  platformFeePct: number;
};

export const PLATFORM_FEE_PCT = 1.2;

export const totalToProtect = (link: TrustLink) =>
  Math.round(link.product.price * (1 + link.platformFeePct / 100)) +
  link.product.deliveryFee;

export const settledToSeller = (link: TrustLink) =>
  link.product.price + link.product.deliveryFee;

export const platformFee = (link: TrustLink) =>
  Math.round(link.product.price * (link.platformFeePct / 100));

export const formatNaira = (n: number) =>
  "₦" + n.toLocaleString("en-NG");
