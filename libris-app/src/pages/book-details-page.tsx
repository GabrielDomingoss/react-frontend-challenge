import { Button, buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useBookDetailsQuery } from "@/entities/book/api/book-queries";
import { ShelfButton } from "@/features/shelf/ui/shelf-button";
import { useParams } from "@tanstack/react-router";
import { cn } from "cn";
import { ExternalLink } from "lucide-react";

export function BookDetailsPage() {
  const { bookId } = useParams({
    from: "/_authenticated/book/$bookId",
  });

  const {
    data: book,
    isPending,
    isError,
    refetch,
  } = useBookDetailsQuery(bookId);

  if (isPending) {
    return (
      <main className="mx-auto grid w-full max-w-5xl gap-8 px-4 py-10 md:grid-cols-[240px_1fr]">
        <Skeleton className="aspect-[2/3] w-full rounded-xl" />

        <div className="space-y-4">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-5 w-1/2" />
          <Skeleton className="h-24 w-full" />
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="mx-auto flex min-h-96 max-w-5xl flex-col items-center justify-center px-4 text-center">
        <h1 className="text-xl font-semibold">Could not load this book</h1>

        <p className="mt-2 text-sm text-muted-foreground">Please try again.</p>

        <Button
          variant="outline"
          className="mt-4"
          onClick={() => void refetch()}
        >
          Try again
        </Button>
      </main>
    );
  }

  return (
    <main className="mx-auto grid w-full max-w-5xl gap-8 px-4 py-10 md:grid-cols-[240px_1fr]">
      <div>
        {book.thumbnail ? (
          <img
            src={book.thumbnail}
            alt={`Cover of ${book.title}`}
            className="w-full rounded-xl object-cover shadow-sm"
          />
        ) : (
          <div className="flex aspect-[2/3] items-center justify-center rounded-xl bg-muted text-sm text-muted-foreground">
            No cover available
          </div>
        )}
      </div>

      <div>
        <h1 className="text-3xl font-semibold tracking-tight">{book.title}</h1>

        <p className="mt-2 text-lg text-muted-foreground">
          {book.authors.length > 0 ? book.authors.join(", ") : "Unknown author"}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <ShelfButton book={book} />

          {book.previewUrl && (
            <a
              href={book.previewUrl}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: "outline" }), "gap-2")}
            >
              <ExternalLink className="size-4" />
              Preview
            </a>
          )}
        </div>

        <div className="mt-8 space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm font-medium">Publisher</p>

              <p className="text-sm text-muted-foreground">
                {book.publisher ?? "Unknown"}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium">Published</p>

              <p className="text-sm text-muted-foreground">
                {book.publishedDate ?? "Unknown"}
              </p>
            </div>
          </div>

          <section>
            <h2 className="mb-2 text-xl font-semibold">Synopsis</h2>

            <p className="whitespace-pre-line leading-7 text-muted-foreground">
              {book.description ?? "No description available for this book."}
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
