import { Decimal } from "@prisma/client/runtime/library";

export interface Product {
  id: string;
  name: string;
  sku: string | null;
  price: Decimal;
  quantity: number;
  lowStockAt: number | null;
  createdAt: Date;
}
