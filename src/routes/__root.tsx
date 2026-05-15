import {
  createRootRoute,
  Outlet,
  useRouterState,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { DemoProvider } from "@/lib/store";
import { ThemeProvider } from "@/lib/theme";
import { DemoBar } from "@/components/DemoBar";

const RootLayout = () => {
  const path = useRouterState({ select: (s) => s.location.pathname });
  // Hide the demo bar on the landing page — the landing has its own chrome.
  const showBar = path !== "/";

  return (
    <ThemeProvider>
      <DemoProvider>
        <main className="flex min-h-dvh w-full flex-col">
          {showBar && <DemoBar />}
          <Outlet />
          <TanStackRouterDevtools />
        </main>
      </DemoProvider>
    </ThemeProvider>
  );
};

export const Route = createRootRoute({ component: RootLayout });
