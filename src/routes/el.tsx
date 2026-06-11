import { createFileRoute, Outlet } from "@tanstack/react-router";

// The root layout already renders <Navbar /> (locale-aware) and wraps Outlet
// in <main className="pt-28">. This Greek layout is intentionally a passthrough
// so EL routes are not double-wrapped.
export const Route = createFileRoute("/el")({
  component: () => <Outlet />,
});
