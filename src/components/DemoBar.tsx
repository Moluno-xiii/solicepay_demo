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
 * Slim chrome bar that frames the demo. Lives above the screen content
 * on every /seller and /t/* route. Holds: brand, role pill, theme
 * toggle, reset, landing link. Compact icon-style controls on mobile;
 * labelled pills on md+.
 */
export function DemoBar() {
  const { role, setRole, reset } = useStore();
  const { theme, toggle } = useTheme();
  const navigate = useNavigate();
  const path = useRouterState({ select: (s) => s.location.pathname });

  // Infer role from path so the pill stays honest
  const inferredRole = path.startsWith("/seller")
    ? "seller"
    : path.startsWith("/t/")
    ? "buyer"
    : role;

  const onReset = () => {
    if (confirm("Reset demo data?")) {
      reset();
      navigate({ to: "/seller" });
    }
  };

  return (
    <header className="sticky top-0 z-30 w-full border-b border-line bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-2 px-3 py-2.5 sm:gap-4 sm:px-5 sm:py-3 lg:px-8">
        <Link to="/" className="flex shrink-0 items-center gap-2 text-ink">
          {/* Compact wordmark on mobile, full on sm+ */}
          <span className="sm:hidden">
            <Wordmark size={16} withMark />
          </span>
          <span className="hidden sm:inline">
            <Wordmark size={18} withMark />
          </span>
        </Link>

        {/* Role switcher — labelled on md+, icon-only on small */}
        <div className="flex items-center gap-1 sm:gap-1.5">
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

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <Link
            to="/"
            className="hidden h-8 items-center gap-1.5 rounded-full border border-line px-3 text-ink-3 transition hover:text-ink md:inline-flex"
            title="Landing page"
          >
            <PiHouseBold size={13} />
            <span className="tiny-caps" style={{ fontSize: 9 }}>
              Landing
            </span>
          </Link>
          <button
            onClick={onReset}
            className="grid h-8 w-8 place-items-center rounded-full border border-line text-ink-3 transition hover:bg-paper-2 hover:text-ink sm:h-9 sm:w-auto sm:gap-1.5 sm:px-3 sm:inline-flex sm:items-center"
            title="Reset demo data"
          >
            <PiArrowCounterClockwiseBold size={13} />
            <span className="tiny-caps hidden sm:inline" style={{ fontSize: 9 }}>
              Reset
            </span>
          </button>
          <button
            onClick={toggle}
            className="grid h-8 w-8 place-items-center rounded-full border border-line text-ink transition hover:bg-paper-2 sm:h-9 sm:w-9"
            title="Toggle theme"
          >
            {theme === "light" ? (
              <PiMoonStarsFill size={13} />
            ) : (
              <PiSunDimFill size={13} />
            )}
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
      className={`inline-flex h-8 items-center gap-1.5 rounded-full px-2.5 transition sm:h-9 sm:px-3.5 ${
        active
          ? "bg-ink text-paper"
          : "border border-line text-ink-3 hover:text-ink"
      }`}
      title={`Acting as ${label}`}
    >
      <Icon size={13} />
      <span className="tiny-caps hidden sm:inline" style={{ fontSize: 9 }}>
        {label}
      </span>
    </button>
  );
}
