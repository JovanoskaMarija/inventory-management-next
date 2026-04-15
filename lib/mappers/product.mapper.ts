import { Decimal } from "@prisma/client/runtime/library";

export type ProductDTO = {
  id: string;
  name: string;
  sku: string | null;
  price: number;
  quantity: number;
  lowStockAt: number | null;
  createdAt: string;
};

export function toProductDTO(
  product: {
    id: string;
    name: string;
    sku: string | null;
    price: Decimal;
    quantity: number;
    lowStockAt: number | null;
    createdAt: Date;
  }[],
): ProductDTO[] {
  return product.map((p) => ({
    id: p.id,
    name: p.name,
    sku: p.sku,
    price: Number(p.price),
    quantity: p.quantity,
    lowStockAt: p.lowStockAt,
    createdAt: p.createdAt.toISOString(),
  }));
}
