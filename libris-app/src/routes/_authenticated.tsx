import { AuthenticatedLayout } from "@/app/layouts/authenticated-layout";
import { useAuthStore } from "@/features/auth/model/auth-store";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: () => {
    const token = useAuthStore.getState().token;

    if (!token) {
      throw redirect({ to: "/login" });
    }
  },
  component: AuthenticatedLayout,
});
