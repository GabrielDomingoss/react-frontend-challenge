import { useAuthStore } from "@/features/auth/model/auth-store";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    const token = useAuthStore.getState().token;

    throw redirect({
      to: token ? "/discover" : "/login",
    });
  },
});
