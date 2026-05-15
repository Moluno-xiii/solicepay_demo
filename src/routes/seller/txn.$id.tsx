import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/seller/txn/$id")({
  component: () => <Outlet />,
});
