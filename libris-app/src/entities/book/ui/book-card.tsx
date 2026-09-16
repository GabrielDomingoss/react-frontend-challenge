import { BookOpen } from "lucide-react";
import { Link } from "@tanstack/react-router";

import { ShelfButton } from "@/features/shelf/ui/shelf-button";

import type { IBook } from "../model/book-types";

interface IBookCardProps {
  book: IBook;
}

export function BookCard({ book }: IBookCardProps) {
  return (
    <article className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-sm transition-all duration-200 hover:border-primary/30 hover:shadow-md">
      <Link
        to="/book/$bookId"
        params={{
          bookId: book.id,
        }}
        className="block p-4 pb-0 sm:p-5 sm:pb-0"
      >
        <div className="flex aspect-[4/5] w-full items-center justify-center overflow-hidden rounded-xl bg-muted">
          {book.thumbnail ? (
            <img
              src={book.thumbnail}
              alt={`Capa de ${book.title}`}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-muted-foreground">
              <BookOpen className="size-10 opacity-40" />

              <span className="text-xs">Capa indisponível</span>
            </div>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <Link
          to="/book/$bookId"
          params={{
            bookId: book.id,
          }}
          className="min-w-0"
        >
          <h2 className="line-clamp-2 text-base font-semibold leading-snug text-foreground transition-colors hover:text-primary">
            {book.title}
          </h2>
        </Link>

        <p className="mt-2 line-clamp-1 text-sm text-muted-foreground">
          {book.authors.length > 0
            ? book.authors.join(", ")
            : "Autor desconhecido"}
        </p>

        {book.publishedDate && (
          <p className="mt-1 text-xs text-muted-foreground">
            {book.publishedDate}
          </p>
        )}

        <div className="mt-auto pt-5">
          <ShelfButton book={book} />
        </div>
      </div>
    </article>
  );
}
