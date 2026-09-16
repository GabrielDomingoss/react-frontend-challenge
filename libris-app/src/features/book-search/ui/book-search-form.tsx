import { Search } from "lucide-react";
import { useForm } from "@tanstack/react-form";

import { Button } from "@/components/ui/button";

import type { OrderBy, PrintType } from "@/entities/book/model/book-types";

export interface IBookSearchFilters {
  query: string;
  printType: PrintType;
  orderBy: OrderBy;
}

interface IBookSearchFormProps {
  onChange: (filters: IBookSearchFilters) => void;
}

export function BookSearchForm({ onChange }: IBookSearchFormProps) {
  const form = useForm({
    defaultValues: {
      query: "",
      printType: "all" as PrintType,
      orderBy: "relevance" as OrderBy,
    },
    onSubmit: ({ value }) => {
      onChange(value);
    },
  });

  const emitChange = (values: Partial<IBookSearchFilters>) => {
    onChange({
      ...form.state.values,
      ...values,
    });
  };

  return (
    <form
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();

        void form.handleSubmit();
      }}
    >
      <form.Field name="query">
        {(field) => (
          <div>
            <label
              htmlFor={field.name}
              className="mb-2 block text-sm font-medium text-foreground"
            >
              Buscar livros
            </label>

            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                <input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => {
                    const value = event.target.value;

                    field.handleChange(value);

                    emitChange({
                      query: value,
                    });
                  }}
                  placeholder="Pesquise por título, autor ou assunto"
                  className="h-11 w-full rounded-lg border bg-background pl-11 pr-4 text-sm text-foreground shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/15"
                />
              </div>

              <Button type="submit" className="h-11 px-6 sm:w-auto">
                Buscar
              </Button>
            </div>
          </div>
        )}
      </form.Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <form.Field name="printType">
          {(field) => (
            <div>
              <label
                htmlFor={field.name}
                className="mb-2 block text-sm font-medium text-foreground"
              >
                Tipo
              </label>

              <select
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) => {
                  const value = event.target.value as PrintType;

                  field.handleChange(value);

                  emitChange({
                    printType: value,
                  });
                }}
                className="h-11 w-full rounded-lg border bg-background px-3 text-sm text-foreground shadow-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/15"
              >
                <option value="all">Todos</option>

                <option value="books">Livros</option>

                <option value="magazines">Revistas</option>
              </select>
            </div>
          )}
        </form.Field>

        <form.Field name="orderBy">
          {(field) => (
            <div>
              <label
                htmlFor={field.name}
                className="mb-2 block text-sm font-medium text-foreground"
              >
                Ordenar por
              </label>

              <select
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) => {
                  const value = event.target.value as OrderBy;

                  field.handleChange(value);

                  emitChange({
                    orderBy: value,
                  });
                }}
                className="h-11 w-full rounded-lg border bg-background px-3 text-sm text-foreground shadow-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/15"
              >
                <option value="relevance">Relevância</option>

                <option value="newest">Mais recentes</option>
              </select>
            </div>
          )}
        </form.Field>
      </div>
    </form>
  );
}
