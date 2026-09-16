import { BookOpen, LogOut } from "lucide-react";
import { Link, Outlet, useNavigate } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/features/auth/model/auth-store";
import { ThemeToggle } from "@/features/theme/ui/theme-toggle";

export function AuthenticatedLayout() {
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    logout();

    await navigate({
      to: "/login",
    });
  };

  return (
    <div className="min-h-screen bg-muted/20">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-8">
            <Link to="/discover" className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                <BookOpen className="size-5" />
              </div>

              <div>
                <p className="font-bold leading-none text-primary">Libris</p>

                <p className="mt-1 text-xs text-muted-foreground">
                  Sua biblioteca pessoal
                </p>
              </div>
            </Link>

            <nav className="hidden items-center gap-1 md:flex">
              <Link
                to="/discover"
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                activeProps={{
                  className:
                    "rounded-lg bg-accent px-3 py-2 text-sm font-semibold text-primary",
                }}
              >
                Descobrir
              </Link>

              <Link
                to="/shelf"
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                activeProps={{
                  className:
                    "rounded-lg bg-accent px-3 py-2 text-sm font-semibold text-primary",
                }}
              >
                Minha estante
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            {user?.email && (
              <div className="mr-2 hidden text-right sm:block">
                <p className="max-w-48 truncate text-sm font-medium text-foreground">
                  {user.email}
                </p>

                <p className="text-xs text-muted-foreground">Leitor</p>
              </div>
            )}

            <ThemeToggle />

            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => void handleLogout()}
              aria-label="Sair"
            >
              <LogOut className="size-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:py-10">
        <Outlet />
      </main>
    </div>
  );
}
