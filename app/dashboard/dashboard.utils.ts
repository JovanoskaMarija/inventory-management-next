import { ProductValueInput, ProductValueOutput } from "./dashboard.types";

export function calculateTotalValue(
  products: { price: number; quantity: number }[],
) {
  return products.reduce((sum, p) => {
    return sum + Number(p.price) * p.quantity;
  }, 0);
}

export function calculatePercentages({
  totalProducts,
  inStockCount,
  lowStockCount,
  outOfStockCount,
}: {
  totalProducts: number;
  inStockCount: number;
  lowStockCount: number;
  outOfStockCount: number;
}) {
  if (totalProducts === 0) {
    return {
      inStockPercentage: 0,
      lowStockPercentage: 0,
      outOfStockPercentage: 0,
    };
  }

  return {
    inStockPercentage: Math.round((inStockCount / totalProducts) * 100),
    lowStockPercentage: Math.round((lowStockCount / totalProducts) * 100),
    outOfStockPercentage: Math.round((outOfStockCount / totalProducts) * 100),
  };
}

export function calculateWeeklyProducts(products: { createdAt: Date }[]) {
  const now = new Date();
  const result = [];

  for (let i = 11; i >= 0; i--) {
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - i * 7);
    weekStart.setHours(0, 0, 0, 0);

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    weekEnd.setHours(23, 59, 59, 999);

    const label = `${String(weekStart.getMonth() + 1).padStart(2, "0")}/${String(
      weekStart.getDate(),
    ).padStart(2, "0")}`;

    const count = products.filter((p) => {
      const d = new Date(p.createdAt);
      return d >= weekStart && d <= weekEnd;
    }).length;

    result.push({ label, products: count });
  }

  return result;
}

export function toProductValueDTO(
  products: ProductValueInput[],
): ProductValueOutput[] {
  return products.map((p) => ({
    price: p.price.toNumber(),
    quantity: p.quantity,
  }));
}
