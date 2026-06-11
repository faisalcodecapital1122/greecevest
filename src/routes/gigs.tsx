import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/gigs")({
  component: () => <Outlet />,
});
