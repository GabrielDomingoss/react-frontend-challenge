import { LogIn, Mail, Lock } from "lucide-react";
import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";

import { useAuthStore } from "../model/auth-store";
import { loginSchema } from "../model/login-schema";

export function LoginForm() {
  const navigate = useNavigate();

  const login = useAuthStore((state) => state.login);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },

    validators: {
      onSubmit: loginSchema,
    },

    onSubmit: async ({ value }) => {
      login(value.email);

      await navigate({
        to: "/discover",
      });
    },
  });

  return (
    <form
      noValidate
      className="space-y-5"
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();

        void form.handleSubmit();
      }}
    >
      <form.Field name="email">
        {(field) => {
          const error = field.state.meta.errors[0]?.message;

          return (
            <div className="space-y-1 flex flex-col">
              <label
                htmlFor={field.name}
                className="text-sm font-medium text-foreground"
              >
                E-mail
              </label>

              <div className="relative">
                <Mail className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                <input
                  id={field.name}
                  name={field.name}
                  type="email"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  placeholder="exemplo@email.com"
                  aria-invalid={Boolean(error)}
                  className="h-11 w-full rounded-lg border bg-background pl-11 pr-4 text-sm text-foreground shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/15 aria-[invalid=true]:border-destructive aria-[invalid=true]:focus:ring-destructive/15"
                />
              </div>

              {error && <p className="text-sm text-destructive">{error}</p>}
            </div>
          );
        }}
      </form.Field>

      <form.Field name="password">
        {(field) => {
          const error = field.state.meta.errors[0]?.message;

          return (
            <div className="space-y-1 flex flex-col">
              <label
                htmlFor={field.name}
                className="text-sm font-medium text-foreground"
              >
                Senha
              </label>

              <div className="relative">
                <Lock className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                <input
                  id={field.name}
                  name={field.name}
                  type="password"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  placeholder="Digite sua senha"
                  aria-invalid={Boolean(error)}
                  className="h-11 w-full rounded-lg border bg-background pl-11 pr-4 text-sm text-foreground shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/15 aria-[invalid=true]:border-destructive aria-[invalid=true]:focus:ring-destructive/15"
                />
              </div>

              {error && <p className="text-sm text-destructive">{error}</p>}
            </div>
          );
        }}
      </form.Field>

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
      >
        {([canSubmit, isSubmitting]) => (
          <Button
            type="submit"
            className="h-11 w-full gap-2"
            disabled={!canSubmit || isSubmitting}
          >
            <LogIn className="size-4" />

            {isSubmitting ? "Entrando..." : "Entrar"}
          </Button>
        )}
      </form.Subscribe>
    </form>
  );
}
