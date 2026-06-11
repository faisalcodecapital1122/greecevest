import { createFileRoute } from "@tanstack/react-router";
import { LoginPage } from "./login";

export const Route = createFileRoute("/el/login")({
  head: () => ({
    meta: [
      { title: "Σύνδεση | GREECEVEST" },
      { name: "description", content: "Συνδέσου στον λογαριασμό σου στην GREECEVEST." },
    ],
  }),
  component: LoginPage,
});
