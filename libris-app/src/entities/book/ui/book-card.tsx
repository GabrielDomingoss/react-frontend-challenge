import { BookOpen } from "lucide-react";
import type { IBook } from "../model/book-types";
import { ShelfButton } from "@/features/shelf/ui/shelf-button";
import { Link } from "@tanstack/react-router";

interface IBookCardProps {
  book: IBook;
}

export function BookCard({ book }: IBookCardProps) {
  return (
    <article className="group overflow-hidden rounded-xl border bg-card transition-shadow hover:shadow-md">
      <div className="aspect-[2/3] overflow-hidden bg-muted">
        <Link
          to="/book/$bookId"
          params={{
            bookId: book.id,
          }}
        >
          {book.thumbnail ? (
            <img
              src={book.thumbnail}
              alt={`Cover of ${book.title}`}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <BookOpen
                className="size-10 text-muted-foreground"
                aria-hidden="true"
              />
              <span className="sr-only">No cover available</span>
            </div>
          )}
        </Link>
      </div>

      <div className="space-y-1.5 p-4">
        <Link
          to="/book/$bookId"
          params={{
            bookId: book.id,
          }}
          className="hover:underline"
        >
          <h2
            className="line-clamp-2 font-semibold leading-snug"
            title={book.title}
          >
            {book.title}
          </h2>
        </Link>

        <p className="line-clamp-1 text-sm text-muted-foreground">
          {book.authors.length > 0 ? book.authors.join(", ") : "Unknown author"}
        </p>

        {book.publishedDate && (
          <p className="text-xs text-muted-foreground">{book.publishedDate}</p>
        )}

        <ShelfButton book={book} />
      </div>
    </article>
  );
}
