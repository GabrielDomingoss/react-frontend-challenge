import { DiscoverPage } from "@/pages/discover-page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/discover")({
  component: DiscoverPage,
});
