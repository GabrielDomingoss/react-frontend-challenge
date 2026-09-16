import { Bookmark, BookmarkCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { IBook } from "@/entities/book/model/book-types";

import { useShelfStore } from "../model/shelf-store";

interface IShelfButtonProps {
  book: IBook;
  className?: string;
}

export function ShelfButton({ book, className }: IShelfButtonProps) {
  const books = useShelfStore((state) => state.books);

  const addBook = useShelfStore((state) => state.addBook);

  const removeBook = useShelfStore((state) => state.removeBook);

  const isSaved = books.some((item) => item.id === book.id);

  const handleClick = () => {
    if (isSaved) {
      removeBook(book.id);
      return;
    }

    addBook(book);
  };

  return (
    <Button
      type="button"
      variant={isSaved ? "outline" : "default"}
      className={className}
      onClick={handleClick}
    >
      {isSaved ? (
        <BookmarkCheck className="size-4" />
      ) : (
        <Bookmark className="size-4" />
      )}

      {isSaved ? "Remover da estante" : "Adicionar à estante"}
    </Button>
  );
}
