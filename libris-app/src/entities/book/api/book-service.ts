import { api } from "@/shared/api/api-client";
import type {
  IBook,
  IGoogleBookVolume,
  ISearchBooksParams,
  ISearchBooksResult,
} from "../model/book-types";
import type { IGoogleBooksResponse } from "../model/book-types";
import { mapGoogleBook } from "../lib/book.mapper";

const apiKey = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

export async function searchBooks(
  params: ISearchBooksParams,
): Promise<ISearchBooksResult> {
  const response = await api.get<IGoogleBooksResponse>("volumes", {
    params: {
      q: params.query,
      startIndex: params.startIndex,
      maxResults: params.maxResults,
      printType: params.printType,
      orderBy: params.orderBy,
      ...(apiKey && {
        key: apiKey,
      }),
    },
  });
  return {
    books: (response.data.items ?? []).map(mapGoogleBook),
    totalItems: response.data.totalItems,
  };
}

export async function getBookById(bookId: string): Promise<IBook> {
  const response = await api.get<IGoogleBookVolume>(`volumes/${bookId}`, {
    params: {
      ...(apiKey && { key: apiKey }),
    },
  });

  return mapGoogleBook(response.data);
}
