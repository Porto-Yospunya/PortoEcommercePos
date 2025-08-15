import { z } from "zod";

export const baseUserSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
  fullName: z.string().optional(),
  image: z.any().optional(),
  phone: z.string().optional(),
  role: z.string().optional(),
  email: z.string().email("Email is incorrect format"),
  organizationId: z.string().optional(),
});

export const createUserSchema = baseUserSchema
  .omit({ id: true })
  .extend({
    password: z.string().min(8, "Plassword is required"),
    confirmPassword: z.string().min(8, "Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const updateUserSchema = baseUserSchema.partial();

// Using show user
export type UserSchemaType = z.infer<typeof baseUserSchema>;
// Using create user
export type CreateUserSchemaType = z.infer<typeof createUserSchema>;
// Using update user
export type UpdateUserSchemaType = z.infer<typeof updateUserSchema>;

export const userSchemaValue: UserSchemaType = {
  id: "",
  name: "",
  email: "",
}