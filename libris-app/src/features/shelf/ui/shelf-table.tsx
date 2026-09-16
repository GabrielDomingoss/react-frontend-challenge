import { useMemo } from "react";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  BookOpen,
  Eye,
  Trash2,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import {
  createSortedRowModel,
  rowSortingFeature,
  sortFns,
  tableFeatures,
  useTable,
  type ColumnDef,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

import {
  useShelfStore,
  type IShelfBook,
  type ReadingStatus,
} from "../model/shelf-store";

const STATUS_LABELS: Record<ReadingStatus, string> = {
  "want-to-read": "Quero ler",
  reading: "Lendo",
  completed: "Concluído",
};

const shelfTableFeatures = tableFeatures({
  rowSortingFeature,
  sortedRowModel: createSortedRowModel(),
  sortFns,
});

function getStatusClasses(status: ReadingStatus) {
  switch (status) {
    case "reading":
      return "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-300";

    case "completed":
      return "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300";

    default:
      return "border-primary/20 bg-primary/5 text-primary";
  }
}

export function ShelfTable() {
  const books = useShelfStore((state) => state.books);

  const removeBook = useShelfStore((state) => state.removeBook);

  const updateStatus = useShelfStore((state) => state.updateStatus);

  const columns = useMemo<
    Array<ColumnDef<typeof shelfTableFeatures, IShelfBook>>
  >(
    () => [
      {
        id: "cover",
        header: "Capa",
        enableSorting: false,
        cell: ({ row }) => {
          const book = row.original;

          return (
            <div className="flex size-14 items-center justify-center overflow-hidden rounded-lg bg-muted">
              {book.thumbnail ? (
                <img
                  src={book.thumbnail}
                  alt={`Capa de ${book.title}`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <BookOpen className="size-5 text-muted-foreground/50" />
              )}
            </div>
          );
        },
      },

      {
        accessorKey: "title",
        header: "Título",
        cell: ({ row }) => {
          const book = row.original;

          return (
            <div className="min-w-48">
              <Link
                to="/book/$bookId"
                params={{
                  bookId: book.id,
                }}
                className="font-semibold text-foreground transition-colors hover:text-primary"
              >
                {book.title}
              </Link>
            </div>
          );
        },
      },

      {
        id: "authors",
        accessorFn: (row) => row.authors.join(", "),
        header: "Autor",
        enableSorting: false,
        cell: ({ row }) => (
          <span className="block min-w-40 text-sm text-muted-foreground">
            {row.original.authors.length > 0
              ? row.original.authors.join(", ")
              : "Autor desconhecido"}
          </span>
        ),
      },

      {
        accessorKey: "publishedDate",
        header: "Publicação",
        enableSorting: false,
        cell: ({ row }) => (
          <span className="whitespace-nowrap text-sm text-muted-foreground">
            {row.original.publishedDate ?? "Não informado"}
          </span>
        ),
      },

      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const book = row.original;

          return (
            <select
              value={book.status}
              onChange={(event) =>
                updateStatus(book.id, event.target.value as ReadingStatus)
              }
              className={`h-9 min-w-32 rounded-lg border px-3 text-sm font-medium outline-none transition-colors focus:ring-2 focus:ring-primary/20 ${getStatusClasses(
                book.status,
              )}`}
              aria-label={`Status de ${book.title}`}
            >
              <option value="want-to-read">
                {STATUS_LABELS["want-to-read"]}
              </option>

              <option value="reading">{STATUS_LABELS.reading}</option>

              <option value="completed">{STATUS_LABELS.completed}</option>
            </select>
          );
        },
      },

      {
        id: "actions",
        header: "Ações",
        enableSorting: false,
        cell: ({ row }) => {
          const book = row.original;

          return (
            <div className="flex items-center gap-1">
              <Link
                to="/book/$bookId"
                params={{
                  bookId: book.id,
                }}
                className="inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
                aria-label={`Ver detalhes de ${book.title}`}
              >
                <Eye className="size-4" />
              </Link>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-destructive"
                aria-label={`Remover ${book.title} da estante`}
                onClick={() => removeBook(book.id)}
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          );
        },
      },
    ],
    [removeBook, updateStatus],
  );

  const table = useTable({
    key: "shelf-table",
    features: shelfTableFeatures,
    columns,
    data: books,
    enableSortingRemoval: false,
  });

  return (
    <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="bg-primary">
                {headerGroup.headers.map((header) => {
                  const canSort = header.column.getCanSort();

                  const sorted = header.column.getIsSorted();

                  return (
                    <th
                      key={header.id}
                      className="px-5 py-4 text-left text-sm font-semibold text-primary-foreground"
                    >
                      {header.isPlaceholder ? null : canSort ? (
                        <button
                          type="button"
                          onClick={header.column.getToggleSortingHandler()}
                          className="flex items-center gap-2 transition-opacity hover:opacity-80"
                        >
                          <table.FlexRender header={header} />

                          {sorted === "asc" ? (
                            <ArrowUp className="size-4" />
                          ) : sorted === "desc" ? (
                            <ArrowDown className="size-4" />
                          ) : (
                            <ArrowUpDown className="size-4 opacity-70" />
                          )}
                        </button>
                      ) : (
                        <table.FlexRender header={header} />
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-b transition-colors last:border-b-0 hover:bg-muted/30"
              >
                {row.getAllCells().map((cell) => (
                  <td key={cell.id} className="px-5 py-4 align-middle">
                    <table.FlexRender cell={cell} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
