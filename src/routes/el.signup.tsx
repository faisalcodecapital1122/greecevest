import { createFileRoute } from "@tanstack/react-router";
import { SignupPage } from "./signup";

export const Route = createFileRoute("/el/signup")({
  head: () => ({
    meta: [
      { title: "Δημιουργία λογαριασμού | GREECEVEST" },
      { name: "description", content: "Δημιούργησε λογαριασμό στην GREECEVEST." },
    ],
  }),
  component: SignupPage,
});
