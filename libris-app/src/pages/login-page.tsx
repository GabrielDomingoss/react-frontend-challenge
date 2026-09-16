import { BookOpen } from "lucide-react";

import { LoginForm } from "@/features/auth/ui/login-form";
import { ThemeToggle } from "@/features/theme/ui/theme-toggle";

export function LoginPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center bg-muted/20 px-4 py-10 sm:px-6">
      <div className="absolute right-5 top-5">
        <ThemeToggle />
      </div>

      <section className="w-full max-w-md rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
        <div className="mb-8 text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <BookOpen className="size-6" />
          </div>

          <p className="mt-4 text-xl font-bold text-primary">Libris</p>

          <p className="mt-1 text-sm text-muted-foreground">
            Sua biblioteca pessoal
          </p>
        </div>

        <div className="mb-8">
          <span className="text-sm font-semibold text-primary">Bem-vindo!</span>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
            Entre na sua conta
          </h1>

          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Informe suas credenciais para acessar sua biblioteca.
          </p>
        </div>

        <LoginForm />

        <div className="mt-8 rounded-xl border bg-muted/30 p-4">
          <p className="text-center text-xs leading-5 text-muted-foreground">
            Esta é uma autenticação simulada para fins de demonstração. Você
            pode utilizar qualquer e-mail válido e uma senha com mais de 6
            caracteres.
          </p>
        </div>
      </section>
    </main>
  );
}
