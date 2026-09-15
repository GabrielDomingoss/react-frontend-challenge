import type { IBook } from "@/entities/book/model/book-types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ReadingStatus = "want-to-read" | "reading" | "completed";

export interface IShelfBook extends IBook {
  status: ReadingStatus;
}

interface IShelfState {
  books: IShelfBook[];
  addBook: (book: IBook) => void;
  removeBook: (bookId: string) => void;
  updateStatus: (bookId: string, status: ReadingStatus) => void;
}

export const useShelfStore = create<IShelfState>()(
  persist(
    (set) => ({
      books: [],
      addBook: (book) =>
        set((state) => {
          const alreadyExists = state.books.some((item) => item.id === book.id);

          if (alreadyExists) return state;
          return {
            books: [
              ...state.books,
              {
                ...book,
                status: "want-to-read",
              },
            ],
          };
        }),
      removeBook: (bookId) =>
        set((state) => ({
          books: state.books.filter((book) => book.id !== bookId),
        })),
      updateStatus: (bookId, status) =>
        set((state) => ({
          books: state.books.map((book) =>
            book.id === bookId ? { ...book, status } : book,
          ),
        })),
    }),
    { name: "libris-shelf" },
  ),
);
