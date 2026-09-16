import { BookOpen, LibraryBig, Search } from "lucide-react";
import { Link } from "@tanstack/react-router";

import { buttonVariants } from "@/components/ui/button";
import { ShelfTable } from "@/features/shelf/ui/shelf-table";
import { useShelfStore } from "@/features/shelf/model/shelf-store";

export function ShelfPage() {
  const books = useShelfStore((state) => state.books);

  const totalBooks = books.length;

  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <LibraryBig className="size-5" />
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Minha estante
            </h1>
          </div>

          <p className="mt-3 text-muted-foreground">
            Organize os livros que você deseja ler e acompanhe seu progresso.
          </p>
        </div>

        <Link to="/discover" className={`${buttonVariants()} gap-2`}>
          <Search className="size-4" />
          Descobrir livros
        </Link>
      </section>

      {totalBooks > 0 && (
        <div className="flex items-center gap-3 rounded-xl border bg-card px-5 py-4 shadow-sm">
          <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <BookOpen className="size-5" />
          </div>

          <div>
            <p className="font-semibold text-foreground">
              {totalBooks} {totalBooks === 1 ? "livro salvo" : "livros salvos"}
            </p>

            <p className="text-sm text-muted-foreground">
              Classifique suas leituras por título ou status.
            </p>
          </div>
        </div>
      )}

      {totalBooks === 0 ? (
        <section className="flex min-h-[420px] flex-col items-center justify-center rounded-2xl border border-dashed bg-card px-6 text-center shadow-sm">
          <div className="flex size-16 items-center justify-center rounded-full bg-primary/10">
            <LibraryBig className="size-7 text-primary" />
          </div>

          <h2 className="mt-5 text-xl font-semibold text-foreground">
            Sua estante está vazia
          </h2>

          <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
            Explore o catálogo e adicione os livros que deseja acompanhar.
          </p>

          <Link to="/discover" className={`${buttonVariants()} mt-6 gap-2`}>
            <Search className="size-4" />
            Explorar livros
          </Link>
        </section>
      ) : (
        <ShelfTable />
      )}
    </div>
  );
}
