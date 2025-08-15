import { z } from "zod";

export const baseProductSchema = z.object({
  id: z.string(),
  sku: z.string().min(4, "Product Sku is required"),
  name: z.string().min(1, "Name is required"),
  image: z.any().optional(),
  description: z.string().optional(),
  stock: z.coerce
    .number({ invalid_type_error: "Stock must be a number" })
    .min(0, "Stock is required"),
  stockMin: z.coerce
    .number({ invalid_type_error: "Stock Min must be a number" })
    .min(0, "Stock Min is required"),
  price: z.coerce
    .number({ invalid_type_error: "Price must be a number" })
    .min(1, "Price is required")
    .refine((val) => /^\d+(\.\d{1,2})?$/.test(val.toString()), {
      message: "Price must have at most 2 decimal places",
    }),
  unit: z.object({
    name: z.string(),
    id: z.coerce.number().min(1, "Unit is required"),
  }),
  category: z.object({
    name: z.string(),
    id: z.coerce.number().min(1, "Category is required"),
  }),
});

export const createProductSchema = baseProductSchema.omit({ id: true });

export const updateProductSchema = baseProductSchema.partial();

export type ProductSchemaType = z.infer<typeof baseProductSchema>;
export type CreateProductSchemaType = z.infer<typeof createProductSchema>;
export type UpdateProductSchemaType = z.infer<typeof updateProductSchema>;

export const productSchemaValue: ProductSchemaType = {
  id: "",
  sku: "",
  name: "",
  price: 0.0,
  stock: 0,
  stockMin: 0,
  unit: { id: 0, name: "" },
  category: { id: 0, name: "" },
};