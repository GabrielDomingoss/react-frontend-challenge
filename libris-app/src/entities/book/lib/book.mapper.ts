import type { IBook } from "../model/book-types";
import type { IGoogleBookVolume } from "../model/book-types";

function normalizeImageUrl(url: string | undefined): string | null {
  if (!url) return null;
  return url.replace(/^http:\/\//, "https://");
}

export function mapGoogleBook(volume: IGoogleBookVolume): IBook {
  const info = volume.volumeInfo;
  const book: IBook = {
    id: volume.id,
    title: info?.title ?? "Untitled",
    authors: info?.authors ?? [],
    publisher: info?.publisher ?? null,
    publishedDate: info?.publishedDate ?? null,
    description: info?.description ?? null,
    thumbnail: normalizeImageUrl(info?.imageLinks?.thumbnail),
    previewUrl: info?.previewLink ?? null,
  };

  return book;
}
