import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { ISearchBooksParams } from "../model/book-types";
import { getBookById, searchBooks } from "./book-service";

export function useBookSearchQuery(params: ISearchBooksParams) {
  return useQuery({
    queryKey: ["books", "search", params],
    queryFn: () => searchBooks(params),
    enabled: params.query.trim().length > 0,
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  });
}

export function useBookDetailsQuery(bookId: string) {
  return useQuery({
    queryKey: ["books", "details", bookId],
    queryFn: () => getBookById(bookId),
    staleTime: 1000 * 60 * 5,
  });
}
