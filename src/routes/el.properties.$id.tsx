import { createFileRoute } from "@tanstack/react-router";
import { PropertyDetailPage } from "./properties.$id";

export const Route = createFileRoute("/el/properties/$id")({
  component: PropertyDetailPage,
});
