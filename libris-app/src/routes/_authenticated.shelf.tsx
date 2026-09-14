import { ShelfPage } from "@/pages/shelf-page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/shelf")({
  component: ShelfPage,
});
