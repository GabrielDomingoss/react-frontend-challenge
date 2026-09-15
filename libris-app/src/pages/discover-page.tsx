import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useBookSearchQuery } from "@/entities/book/api/book-queries";
import { BookCard } from "@/entities/book/ui/book-card";
import {
  BookSearchForm,
  type IBookSearchFilters,
} from "@/features/book-search/ui/book-search-form";
import { useDebounce } from "@/shared/hooks/use-debounce";
import { LoaderCircle, Search } from "lucide-react";
import { useState } from "react";

const PAGE_SIZE = 12;

const INITIAL_FILTERS: IBookSearchFilters = {
  query: "",
  printType: "all",
  orderBy: "relevance",
};

export function DiscoverPage() {
  const [filters, setFilters] = useState<IBookSearchFilters>(INITIAL_FILTERS);
  const [page, setPage] = useState(0);

  const debouncedQuery = useDebounce(filters.query.trim(), 400);

  const { data, isPending, isFetching, isError, refetch } = useBookSearchQuery({
    query: debouncedQuery,
    startIndex: page * PAGE_SIZE,
    maxResults: PAGE_SIZE,
    printType: filters.printType,
    orderBy: filters.orderBy,
  });

  const handleFiltersChange = (nextFilters: IBookSearchFilters) => {
    setFilters(nextFilters);
    setPage(0);
  };

  const hasPreviousPage = page > 0;
  const hasNextPage =
    data !== undefined && (page + 1) * PAGE_SIZE < data.totalItems;
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          Discover your next book
        </h1>

        <p className="text-muted-foreground">
          Search millions of books and build your personal library
        </p>
      </div>

      <div className="mb-8 max-w-2xl">
        <BookSearchForm onChange={handleFiltersChange} />
      </div>

      {!debouncedQuery ? (
        <div className="flex min-h-72 flex-col items-center justify-center rounded-xl border border-dashed text-center">
          <Search
            className="mb-4 size-10 text-muted-foreground"
            aria-hidden="true"
          />
          <h2 className="font-semibold">Search for a book</h2>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            Search by title, author or keyword to start discovering books
          </p>
        </div>
      ) : isPending ? (
        <BookGridSkeleton />
      ) : isError ? (
        <div className="flex min-h-72 flex-col items-center justify-center rounded-xl border text-center">
          <h2 className="font-semibold">Something went wrong</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            We couldn't load the books. Please try again
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => void refetch()}
          >
            Try again
          </Button>
        </div>
      ) : data.books.length === 0 ? (
        <div className="flex min-h-72 flex-col items-center justify-center rounded-xl border text-center">
          <h2 className="font-semibold">No books found</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Try changing your search or filters
          </p>
        </div>
      ) : (
        <>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {data.totalItems.toLocaleString()} results
            </p>
            {isFetching && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <LoaderCircle className="size-4 animate-spin" />
                Updating...
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {data.books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>

          <div className="mt-8 flex items-center justify-center gap-3">
            <Button
              variant="outline"
              disabled={!hasPreviousPage || isFetching}
              onClick={() => setPage((current) => Math.max(0, current - 1))}
            >
              Previous
            </Button>

            <span className="min-w-20 text-center text-sm text-muted-foreground">
              Page {page + 1}
            </span>

            <Button
              variant="outline"
              disabled={!hasNextPage || isFetching}
              onClick={() => setPage((current) => current + 1)}
            >
              Next
            </Button>
          </div>
        </>
      )}
    </main>
  );
}

function BookGridSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
      {Array.from({ length: PAGE_SIZE }).map((_, index) => (
        <div className="space-y-3" key={index}>
          <Skeleton className="aspect-[2/3] w-full rounded-xl" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-3 w-2/3" />
        </div>
      ))}
    </div>
  );
}
