import { createFileRoute } from "@tanstack/react-router";
import { GigDetailPage } from "./gigs.$id";

export const Route = createFileRoute("/el/gigs/$id")({
  component: GigDetailPage,
});
