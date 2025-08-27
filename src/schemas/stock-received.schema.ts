import { z } from "zod";

export const baseStockReceivedSchema = z.object({
  id: z.string(),
  refCode: z.string(),
  receivedDate: z.date(),
  createdBy: z.string(),
});

export const baseStockReceivedItemSchema = z.object({
  unitCost: z.coerce.number(),
  productId: z.string(),
  productSku: z.string(),
  productName: z.string(),
  quantity: z.coerce.number(),
});

export const createStockReceivedSchema = baseStockReceivedSchema.extend({
  items: z.array(baseStockReceivedItemSchema)
})

export type StockReceivedSchemaType = z.infer<typeof baseStockReceivedSchema>;
export type StockReceivedItemSchemaType = z.infer<typeof baseStockReceivedItemSchema>;
export type CreateStockReceivedSchemaType = z.infer<typeof createStockReceivedSchema>;