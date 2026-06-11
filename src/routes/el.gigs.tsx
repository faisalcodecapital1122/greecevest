import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/el/gigs")({
  component: () => <Outlet />,
});
