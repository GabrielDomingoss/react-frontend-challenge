import { useAuthStore } from "@/features/auth/model/auth-store";
import { LoginPage } from "@/pages/login-page";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  beforeLoad: () => {
    const token = useAuthStore.getState().token;
    if (token) {
      throw redirect({ to: "/discover" });
    }
  },
  component: LoginPage,
});
