import { useShelfStore } from "@/features/shelf/model/shelf-store";
import { ShelfTable } from "@/features/shelf/ui/shelf-table";

export function ShelfPage() {
  const books = useShelfStore((state) => state.books);
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">My Shelf</h1>

        <p className="mt-2 text-muted-foreground">
          Manage your personal library
        </p>
      </div>

      {books.length === 0 ? (
        <div className="rounded-xl border border-dashed p-12 text-center">
          <h2 className="font-semibold">Your shelf is empty</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Add books from Discover to start building your library.
          </p>
        </div>
      ) : (
        <ShelfTable />
      )}
    </main>
  );
}
