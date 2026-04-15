import { Decimal } from "@prisma/client/runtime/library";

export type ProductValueInput = {
  price: Decimal;
  quantity: number;
};

export type ProductValueOutput = {
  price: number;
  quantity: number;
};
