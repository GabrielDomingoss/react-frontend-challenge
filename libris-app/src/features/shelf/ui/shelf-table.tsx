import {
  createSortedRowModel,
  tableFeatures,
  sortFns,
  rowSortingFeature,
  type ColumnDef,
  useTable,
} from "@tanstack/react-table";
import {
  useShelfStore,
  type IShelfBook,
  type ReadingStatus,
} from "../model/shelf-store";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, ArrowUpDown, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const tableFeaturesConfig = tableFeatures({
  rowSortingFeature,
  sortedRowModel: createSortedRowModel(),
  sortFns,
});

const STATUS_LABELS: Record<ReadingStatus, string> = {
  "want-to-read": "Want to read",
  reading: "Reading",
  completed: "Completed",
};

function StatusSelect({ book }: { book: IShelfBook }) {
  const updatedStatus = useShelfStore((state) => state.updateStatus);

  return (
    <select
      value={book.status}
      onChange={(event) =>
        updatedStatus(book.id, event.target.value as ReadingStatus)
      }
      className="h-9 rounded-md border bg-background px-3 text-sm"
    >
      {Object.entries(STATUS_LABELS).map(([value, label]) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
}

function RemoveButton({ bookId }: { bookId: string }) {
  const removeBook = useShelfStore((state) => state.removeBook);

  return (
    <Button
      type="button"
      size="icon"
      variant="ghost"
      aria-label="Remove book"
      onClick={() => removeBook(bookId)}
    >
      <Trash2 className="size-4" />
    </Button>
  );
}

const columns: Array<ColumnDef<typeof tableFeaturesConfig, IShelfBook>> = [
  {
    id: "cover",
    header: "Cover",
    enableSorting: false,
    sortDescFirst: true,
    cell: ({ row }) =>
      row.original.thumbnail ? (
        <img
          src={row.original.thumbnail}
          alt={`Cover of ${row.original.title}`}
          className="h-16 w-11 object-cover"
        />
      ) : (
        <div className="h-16 w-11 rounded bg-muted" />
      ),
  },
  { accessorKey: "title", header: "Title", sortDescFirst: true },
  {
    accessorKey: "author",
    header: "Author",
    enableSorting: false,
    sortDescFirst: true,
    cell: ({ row }) =>
      row.original.authors.length > 0
        ? row.original.authors.join(", ")
        : "Unknown author",
  },
  {
    accessorKey: "publishedDate",
    header: "Published",
    enableSorting: false,
    sortDescFirst: true,
    cell: ({ row }) => row.original.publishedDate ?? "-",
  },
  {
    accessorKey: "status",
    header: "Status",
    sortDescFirst: true,
    cell: ({ row }) => <StatusSelect book={row.original} />,
  },
  {
    accessorKey: "actions",
    header: "Actions",
    enableSorting: false,
    sortDescFirst: true,
    cell: ({ row }) => <RemoveButton bookId={row.original.id} />,
  },
];

export function ShelfTable() {
  const books = useShelfStore((state) => state.books);
  const table = useTable({
    key: "shelf-table",
    features: tableFeaturesConfig,
    columns,
    data: books,
    enableSortingRemoval: false,
  });
  return (
    <div className="overflow-x-auto rounded-lg border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder ? null : (
                    <button
                      type="button"
                      disabled={!header.column.getCanSort()}
                      onClick={header.column.getToggleSortingHandler()}
                      className="flex items-center gap-2 disabled:cursor-default"
                    >
                      <table.FlexRender header={header} />
                      {header.column.getCanSort() && (
                        <>
                          {header.column.getIsSorted() === "asc" && (
                            <ArrowUp className="size-3.5" />
                          )}

                          {header.column.getIsSorted() === "desc" && (
                            <ArrowDown className="size-3.5" />
                          )}

                          {!header.column.getIsSorted() && (
                            <ArrowUpDown className="size-3.5" />
                          )}
                        </>
                      )}
                    </button>
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getAllCells().map((cell) => (
                <TableCell key={cell.id}>
                  <table.FlexRender cell={cell} />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
