import {
  ArrowLeft,
  BookOpen,
  Building2,
  CalendarDays,
  ExternalLink,
} from "lucide-react";
import { Link, useParams } from "@tanstack/react-router";

import { Button, buttonVariants } from "@/components/ui/button";
import { useBookDetailsQuery } from "@/entities/book/api/book-queries";
import { ShelfButton } from "@/features/shelf/ui/shelf-button";

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
      <div className="space-y-6">
        <div className="h-5 w-32 animate-pulse rounded bg-muted" />

        <div className="grid gap-8 rounded-2xl border bg-card p-5 shadow-sm sm:p-8 md:grid-cols-[260px_1fr]">
          <div className="aspect-[3/4] animate-pulse rounded-xl bg-muted" />

          <div className="space-y-5">
            <div className="h-4 w-28 animate-pulse rounded bg-muted" />
            <div className="h-10 w-3/4 animate-pulse rounded bg-muted" />
            <div className="h-5 w-1/2 animate-pulse rounded bg-muted" />

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="h-20 animate-pulse rounded-xl bg-muted" />
              <div className="h-20 animate-pulse rounded-xl bg-muted" />
            </div>

            <div className="h-36 animate-pulse rounded-xl bg-muted" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !book) {
    return (
      <section className="flex min-h-[420px] flex-col items-center justify-center rounded-2xl border bg-card px-6 text-center shadow-sm">
        <div className="flex size-14 items-center justify-center rounded-full bg-destructive/10">
          <BookOpen className="size-6 text-destructive" />
        </div>

        <h1 className="mt-5 text-xl font-semibold text-foreground">
          Não foi possível carregar este livro
        </h1>

        <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
          Ocorreu um erro ao consultar os detalhes do livro. Tente novamente.
        </p>

        <div className="mt-6 flex gap-3">
          <Link
            to="/discover"
            className={buttonVariants({
              variant: "outline",
            })}
          >
            Voltar
          </Link>

          <Button type="button" onClick={() => void refetch()}>
            Tentar novamente
          </Button>
        </div>
      </section>
    );
  }

  return (
    <div className="space-y-6">
      <Link
        to="/discover"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="size-4" />
        Voltar para descoberta
      </Link>

      <article className="overflow-hidden rounded-2xl border bg-card shadow-sm">
        <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-[300px_1fr] lg:gap-12 lg:p-10">
          <div>
            <div className="overflow-hidden rounded-2xl border bg-muted/40 p-4">
              <div className="flex aspect-[3/4] items-center justify-center overflow-hidden rounded-xl bg-muted">
                {book.thumbnail ? (
                  <img
                    src={book.thumbnail}
                    alt={`Capa de ${book.title}`}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-muted-foreground">
                    <BookOpen className="size-14 opacity-30" />

                    <span className="text-sm">Capa indisponível</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex min-w-0 flex-col">
            <div>
              <span className="text-sm font-semibold text-primary">
                Detalhes do livro
              </span>

              <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {book.title}
              </h1>

              <p className="mt-3 text-lg text-muted-foreground">
                {book.authors.length > 0
                  ? book.authors.join(", ")
                  : "Autor desconhecido"}
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ShelfButton book={book} className="w-full sm:w-auto" />

              {book.previewUrl && (
                <a
                  href={book.previewUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`${buttonVariants({
                    variant: "outline",
                  })} w-full gap-2 sm:w-auto`}
                >
                  <ExternalLink className="size-4" />
                  Ver no Google Books
                </a>
              )}
            </div>

            <div className="my-8 border-t" />

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border bg-muted/20 p-4">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Building2 className="size-4 text-primary" />
                  Editora
                </div>

                <p className="mt-2 font-medium text-foreground">
                  {book.publisher ?? "Não informada"}
                </p>
              </div>

              <div className="rounded-xl border bg-muted/20 p-4">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <CalendarDays className="size-4 text-primary" />
                  Publicação
                </div>

                <p className="mt-2 font-medium text-foreground">
                  {book.publishedDate ?? "Não informada"}
                </p>
              </div>
            </div>

            <section className="mt-8">
              <h2 className="text-xl font-bold text-foreground">Sinopse</h2>

              {book.description ? (
                <p className="mt-4 whitespace-pre-line text-sm leading-7 text-muted-foreground sm:text-base">
                  {book.description}
                </p>
              ) : (
                <div className="mt-4 rounded-xl border border-dashed bg-muted/20 p-5">
                  <p className="text-sm text-muted-foreground">
                    Nenhuma sinopse disponível para este livro.
                  </p>
                </div>
              )}
            </section>
          </div>
        </div>
      </article>
    </div>
  );
}
