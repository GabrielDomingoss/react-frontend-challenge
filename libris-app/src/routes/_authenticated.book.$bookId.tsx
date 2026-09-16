import { BookDetailsPage } from "@/pages/book-details-page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/book/$bookId")({
  component: BookDetailsPage,
});
