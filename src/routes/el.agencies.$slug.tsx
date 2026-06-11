import { createFileRoute } from "@tanstack/react-router";
import { AgencyDetailPage } from "./agencies.$slug";

export const Route = createFileRoute("/el/agencies/$slug")({
  component: AgencyDetailPage,
});
