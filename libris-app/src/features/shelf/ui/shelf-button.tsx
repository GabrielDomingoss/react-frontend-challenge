import type { IBook } from "@/entities/book/model/book-types";
import { useShelfStore } from "../model/shelf-store";
import { Button } from "@/components/ui/button";
import { Bookmark, BookmarkCheck } from "lucide-react";

interface IShelfButtonProps {
  book: IBook;
}

export function ShelfButton({ book }: IShelfButtonProps) {
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
      variant={isSaved ? "secondary" : "default"}
      className="w-full"
      onClick={handleClick}
    >
      {isSaved ? (
        <BookmarkCheck className="size-4" />
      ) : (
        <Bookmark className="size-4" />
      )}

      {isSaved ? "On my shelf" : "Add to shelf"}
    </Button>
  );
}
