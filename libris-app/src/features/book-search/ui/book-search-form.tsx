import { useForm } from "@tanstack/react-form";
import { Search } from "lucide-react";
import { Input } from "@base-ui/react/input";
import type { OrderBy, PrintType } from "@/entities/book/model/book-types";

interface IBookSearchFormProps {
  onChange: (filters: IBookSearchFilters) => void;
}

export interface IBookSearchFilters {
  query: string;
  printType: PrintType;
  orderBy: OrderBy;
}

export function BookSearchForm({ onChange }: IBookSearchFormProps) {
  const form = useForm({
    defaultValues: {
      query: "",
      printType: "all",
      orderBy: "relevance",
    } as IBookSearchFilters,
  });

  return (
    <form className="space-y-4" onSubmit={(event) => event.preventDefault()}>
      <form.Field name="query">
        {(field) => (
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />

            <Input
              value={field.state.value}
              onChange={(event) => {
                const query = event.target.value;
                field.handleChange(query);
                onChange({
                  ...form.state.values,
                  query,
                });
              }}
              placeholder="Search by title, author..."
              className="pl-9"
              aria-label="Search books"
            />
          </div>
        )}
      </form.Field>

      <div className="grid gap-3 sm:grid-cols-2">
        <form.Field name="printType">
          {(field) => (
            <div className="space-y-1.5">
              <label htmlFor="print-type" className="text-sm font-medium">
                Type
              </label>
              <select
                value={field.state.value}
                id="print-type"
                onChange={(event) => {
                  const printType = event.target
                    .value as IBookSearchFilters["printType"];
                  field.handleChange(printType);
                  onChange({
                    ...form.state.values,
                    printType,
                  });
                }}
                className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="all">All</option>
                <option value="books">Books</option>
                <option value="magazines">Magazines</option>
              </select>
            </div>
          )}
        </form.Field>

        <form.Field name="orderBy">
          {(field) => (
            <div className="space-y-1.5">
              <label htmlFor="order-by" className="text-sm font-medium">
                Order by
              </label>

              <select
                id="order-by"
                value={field.state.value}
                onChange={(event) => {
                  const orderBy = event.target
                    .value as IBookSearchFilters["orderBy"];
                  field.handleChange(orderBy);
                  onChange({ ...form.state.values, orderBy });
                }}
                className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="relevance">Relevance</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          )}
        </form.Field>
      </div>
    </form>
  );
}
