import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  PiArrowCounterClockwiseBold,
  PiHouseBold,
  PiMoonStarsFill,
  PiSunDimFill,
  PiUserBold,
  PiStorefrontBold,
} from "react-icons/pi";
import { useStore } from "@/lib/store";
import { useTheme } from "@/lib/theme";
import { Wordmark } from "@/components/Brand";

/**
 * Slim chrome bar that frames the demo. Lives above the phone screen
 * on every /seller and /t/* route. Holds: brand, role pill, theme
 * toggle, and reset.
 */
export function DemoBar() {
  const { role, setRole, reset } = useStore();
  const { theme, toggle } = useTheme();
  const navigate = useNavigate();
  const path = useRouterState({ select: (s) => s.location.pathname });

  // Infer role from path so the pill stays honest
  const inferredRole = path.startsWith("/seller") ? "seller" : path.startsWith("/t/") ? "buyer" : role;

  return (
    <header className="sticky top-0 z-30 w-full border-b border-line bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-4 px-5 py-3 lg:px-8">
        <Link to="/" className="flex items-center gap-2 text-ink">
          <Wordmark size={18} withMark />
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          <RolePill
            active={inferredRole === "seller"}
            label="Selling"
            Icon={PiStorefrontBold}
            onClick={() => {
              setRole("seller");
              navigate({ to: "/seller" });
            }}
          />
          <RolePill
            active={inferredRole === "buyer"}
            label="Buying"
            Icon={PiUserBold}
            onClick={() => {
              setRole("buyer");
              navigate({ to: "/t/$id", params: { id: "SLC-9F3K2" } });
            }}
          />
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="hidden items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-ink-3 hover:text-ink md:inline-flex"
            title="Landing page"
          >
            <PiHouseBold size={14} />
            <span className="tiny-caps" style={{ fontSize: 9 }}>
              Landing
            </span>
          </Link>
          <button
            onClick={() => {
              if (confirm("Reset demo data?")) {
                reset();
                navigate({ to: "/seller" });
              }
            }}
            className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-ink-3 transition hover:text-ink"
            title="Reset demo"
          >
            <PiArrowCounterClockwiseBold size={14} />
            <span className="tiny-caps" style={{ fontSize: 9 }}>
              Reset
            </span>
          </button>
          <button
            onClick={toggle}
            className="grid h-8 w-8 place-items-center rounded-full border border-line text-ink transition hover:bg-paper-2"
            title="Toggle theme"
          >
            {theme === "light" ? <PiMoonStarsFill size={14} /> : <PiSunDimFill size={14} />}
          </button>
        </div>
      </div>
    </header>
  );
}

function RolePill({
  active,
  label,
  Icon,
  onClick,
}: {
  active: boolean;
  label: string;
  Icon: any;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 transition ${
        active
          ? "bg-ink text-paper"
          : "border border-line text-ink-3 hover:text-ink"
      }`}
    >
      <Icon size={13} />
      <span className="tiny-caps" style={{ fontSize: 9 }}>
        Acting as {label}
      </span>
    </button>
  );
}
