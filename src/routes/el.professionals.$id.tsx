import { createFileRoute } from "@tanstack/react-router";
import { ProfessionalProfilePage } from "./professionals.$id";

export const Route = createFileRoute("/el/professionals/$id")({
  component: ProfessionalProfilePage,
});
