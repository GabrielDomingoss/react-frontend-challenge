import { beforeEach, describe, expect, it } from "vitest";

import { useShelfStore } from "./shelf-store";

const book = {
  id: "123",
  title: "Clean Code",
  authors: ["Robert C. Martin"],
  publisher: "Prentice Hall",
  publishedDate: "2008",
  description: "Description",
  thumbnail: null,
  previewUrl: null,
};

describe("useShelfStore", () => {
  beforeEach(() => {
    useShelfStore.setState({
      books: [],
    });

    localStorage.clear();
  });

  it("adds a book to the shelf", () => {
    useShelfStore.getState().addBook(book);

    const books = useShelfStore.getState().books;

    expect(books).toHaveLength(1);
    expect(books[0].id).toBe("123");
    expect(books[0].status).toBe("want-to-read");
  });

  it("does not add the same book twice", () => {
    useShelfStore.getState().addBook(book);
    useShelfStore.getState().addBook(book);

    expect(useShelfStore.getState().books).toHaveLength(1);
  });

  it("updates the reading status", () => {
    useShelfStore.getState().addBook(book);

    useShelfStore.getState().updateStatus("123", "completed");

    expect(useShelfStore.getState().books[0].status).toBe("completed");
  });

  it("removes a book from the shelf", () => {
    useShelfStore.getState().addBook(book);
    useShelfStore.getState().removeBook("123");

    expect(useShelfStore.getState().books).toHaveLength(0);
  });
});
