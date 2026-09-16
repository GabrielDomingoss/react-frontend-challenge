import { describe, expect, it } from "vitest";

import { loginSchema } from "./login-schema";

describe("loginSchema", () => {
  it("accepts a valid email and password", () => {
    const result = loginSchema.safeParse({
      email: "user@example.com",
      password: "1234567",
    });

    expect(result.success).toBe(true);
  });

  it("rejects an invalid email", () => {
    const result = loginSchema.safeParse({
      email: "invalid-email",
      password: "1234567",
    });

    expect(result.success).toBe(false);
  });

  it("rejects passwords with 6 characters or less", () => {
    const result = loginSchema.safeParse({
      email: "user@example.com",
      password: "123456",
    });

    expect(result.success).toBe(false);
  });
});
