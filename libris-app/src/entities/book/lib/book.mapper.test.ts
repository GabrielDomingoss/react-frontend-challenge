import { describe, expect, it } from "vitest";

import { mapGoogleBook } from "./book.mapper";

describe("mapGoogleBook", () => {
  it("maps Google Books data to the application book model", () => {
    const book = mapGoogleBook({
      id: "123",
      volumeInfo: {
        title: "Clean Code",
        authors: ["Robert C. Martin"],
        publisher: "Prentice Hall",
        publishedDate: "2008",
        description: "A book about clean code.",
        imageLinks: {
          thumbnail: "http://example.com/cover.jpg",
        },
        previewLink: "https://example.com/preview",
      },
    });

    expect(book).toEqual({
      id: "123",
      title: "Clean Code",
      authors: ["Robert C. Martin"],
      publisher: "Prentice Hall",
      publishedDate: "2008",
      description: "A book about clean code.",
      thumbnail: "https://example.com/cover.jpg",
      previewUrl: "https://example.com/preview",
    });
  });

  it("handles missing optional Google Books fields", () => {
    const book = mapGoogleBook({
      id: "123",
      volumeInfo: {
        title: "Some Book",
      },
    });

    expect(book.authors).toEqual([]);
    expect(book.publisher).toBeNull();
    expect(book.publishedDate).toBeNull();
    expect(book.description).toBeNull();
    expect(book.thumbnail).toBeNull();
    expect(book.previewUrl).toBeNull();
  });
});
