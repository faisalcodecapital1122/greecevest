import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/el/properties")({
  component: () => <Outlet />,
});
