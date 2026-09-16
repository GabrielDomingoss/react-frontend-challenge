import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/features/auth/model/auth-store";
import { ThemeToggle } from "@/features/theme/ui/theme-toggle";
import { Link, Outlet, useNavigate } from "@tanstack/react-router";

export function AuthenticatedLayout() {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    logout();

    await navigate({
      to: "/login",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8">
            <Link
              to="discover"
              className="text-xl font-semibold tracking-tight"
            >
              Libris
            </Link>
            <nav className="hidden items-center gap-6 sm:flex">
              <Link
                to="/discover"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                activeProps={{
                  className: "text-sm font-medium text-foreground",
                }}
              >
                Discover
              </Link>

              <Link
                to="/shelf"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                activeProps={{
                  className: "text-sm font-medium text-foreground",
                }}
              >
                My shelf
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />

            <Button variant="ghost" onClick={() => void handleLogout()}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <Outlet />
    </div>
  );
}
