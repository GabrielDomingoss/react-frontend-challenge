import { useState } from "react";
import { BookOpen, ChevronLeft, ChevronRight, LibraryBig } from "lucide-react";
import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { BookCard } from "@/entities/book/ui/book-card";
import { useBookSearchQuery } from "@/entities/book/api/book-queries";
import type { OrderBy, PrintType } from "@/entities/book/model/book-types";
import {
  BookSearchForm,
  type IBookSearchFilters,
} from "@/features/book-search/ui/book-search-form";
import { useDebounce } from "@/shared/hooks/use-debounce";

const PAGE_SIZE = 12;

const INITIAL_FILTERS: IBookSearchFilters = {
  query: "",
  printType: "all" as PrintType,
  orderBy: "relevance" as OrderBy,
};

export function DiscoverPage() {
  const [filters, setFilters] = useState<IBookSearchFilters>(INITIAL_FILTERS);

  const [page, setPage] = useState(0);

  const debouncedQuery = useDebounce(filters.query.trim(), 400);

  const { data, isPending, isFetching, isError, refetch } = useBookSearchQuery({
    query: debouncedQuery,
    printType: filters.printType,
    orderBy: filters.orderBy,
    startIndex: page * PAGE_SIZE,
    maxResults: PAGE_SIZE,
  });

  const handleFiltersChange = (nextFilters: IBookSearchFilters) => {
    setFilters(nextFilters);
    setPage(0);
  };

  const hasSearch = debouncedQuery.length > 0;

  const books = data?.books ?? [];

  const hasPreviousPage = page > 0;

  const hasNextPage = data ? (page + 1) * PAGE_SIZE < data.totalItems : false;

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-2xl border bg-card shadow-sm">
        <div className="grid gap-8 px-5 py-8 sm:px-8 lg:grid-cols-[1fr_0.8fr] lg:px-10 lg:py-10">
          <div className="flex flex-col justify-center">
            <span className="text-sm font-semibold text-primary">
              Descubra sua próxima leitura
            </span>

            <h1 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Explore novas histórias para a sua estante
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
              Pesquise no catálogo do Google Books, descubra novos títulos e
              organize suas próximas leituras.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <Link
                to="/shelf"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border bg-background px-4 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent"
              >
                <LibraryBig className="size-4" />
                Minha estante
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="flex aspect-square w-full max-w-64 items-center justify-center rounded-full bg-primary/10">
              <div className="flex size-36 items-center justify-center rounded-full bg-primary/10">
                <BookOpen className="size-16 text-primary" />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t bg-muted/20 p-5 sm:p-6 lg:p-8">
          <BookSearchForm onChange={handleFiltersChange} />
        </div>
      </section>

      {!hasSearch && (
        <section className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed bg-card px-6 text-center">
          <div className="flex size-14 items-center justify-center rounded-full bg-primary/10">
            <BookOpen className="size-6 text-primary" />
          </div>

          <h2 className="mt-5 text-lg font-semibold text-foreground">
            Encontre seu próximo livro
          </h2>

          <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
            Pesquise por título, autor ou assunto para explorar o catálogo.
          </p>
        </section>
      )}

      {hasSearch && isPending && (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({
            length: 8,
          }).map((_, index) => (
            <div
              key={index}
              className="h-[440px] animate-pulse rounded-2xl border bg-card"
            >
              <div className="m-5 h-64 rounded-xl bg-muted" />

              <div className="space-y-3 px-5">
                <div className="h-4 w-3/4 rounded bg-muted" />
                <div className="h-3 w-1/2 rounded bg-muted" />
              </div>
            </div>
          ))}
        </div>
      )}

      {hasSearch && isError && (
        <section className="flex min-h-64 flex-col items-center justify-center rounded-2xl border bg-card px-6 text-center shadow-sm">
          <h2 className="text-lg font-semibold text-foreground">
            Não foi possível carregar os livros
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Ocorreu um erro ao consultar o catálogo. Tente novamente.
          </p>

          <Button type="button" className="mt-5" onClick={() => void refetch()}>
            Tentar novamente
          </Button>
        </section>
      )}

      {hasSearch && !isPending && !isError && books.length === 0 && (
        <section className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed bg-card px-6 text-center">
          <BookOpen className="size-9 text-primary/50" />

          <h2 className="mt-4 text-lg font-semibold text-foreground">
            Nenhum livro encontrado
          </h2>

          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            Tente alterar os termos da busca ou os filtros selecionados.
          </p>
        </section>
      )}

      {books.length > 0 && (
        <section>
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-foreground">Resultados</h2>

              <p className="mt-1 text-sm text-muted-foreground">
                {data?.totalItems.toLocaleString("pt-BR")} livros encontrados
              </p>
            </div>

            {isFetching && (
              <span className="text-xs text-muted-foreground">
                Atualizando resultados...
              </span>
            )}
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>

          <div className="mt-8 flex items-center justify-center gap-3">
            <Button
              type="button"
              variant="outline"
              disabled={!hasPreviousPage}
              onClick={() => setPage((current) => Math.max(0, current - 1))}
            >
              <ChevronLeft className="size-4" />
              Anterior
            </Button>

            <span className="min-w-24 text-center text-sm text-muted-foreground">
              Página {page + 1}
            </span>

            <Button
              type="button"
              variant="outline"
              disabled={!hasNextPage}
              onClick={() => setPage((current) => current + 1)}
            >
              Próxima
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </section>
      )}
    </div>
  );
}
