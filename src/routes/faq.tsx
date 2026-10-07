import { createFileRoute, redirect } from "@tanstack/react-router";

// The FAQ now lives on the combined "В чем идея и FAQ" page.
export const Route = createFileRoute("/faq")({
  beforeLoad: () => {
    throw redirect({ to: "/about", hash: "faq" });
  },
});
