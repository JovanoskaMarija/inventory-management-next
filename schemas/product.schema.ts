import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  price: z.number().nonnegative().min(1, "Price must be greater than 0"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  sku: z.string().optional(),
  lowStockAt: z.number().min(0).optional(),
});

export type ProductFormValues = z.infer<typeof productSchema>;
