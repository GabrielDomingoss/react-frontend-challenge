import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(7, "Password must contain more than 6 characters"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
