export interface IBook {
  id: string;
  title: string;
  authors: string[];
  publisher: string | null;
  publishedDate: string | null;
  description: string | null;
  thumbnail: string | null;
  previewUrl: string | null;
}

export type PrintType = "all" | "books" | "magazines";
export type OrderBy = "relevance" | "newest";

export interface ISearchBooksParams {
  query: string;
  startIndex: number;
  maxResults: number;
  printType: PrintType;
  orderBy: OrderBy;
}

export interface ISearchBooksResult {
  books: IBook[];
  totalItems: number;
}

export interface IGoogleBookVolume {
  id: string;
  volumeInfo: {
    title?: string;
    authors?: string[];
    publisher?: string;
    publishedDate?: string;
    description?: string;
    imageLinks?: {
      smallThumbnail?: string;
      thumbnail?: string;
    };
    previewLink?: string;
  };
}

export interface IGoogleBooksResponse {
  totalItems: number;
  items?: IGoogleBookVolume[];
}
