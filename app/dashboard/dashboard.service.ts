import { prisma } from "@/lib/prisma";
import {
  calculatePercentages,
  calculateTotalValue,
  calculateWeeklyProducts,
  toProductValueDTO,
} from "./dashboard.utils";

export async function getDashboardData(userId: string) {
  const [
    totalProducts,
    inStockCount,
    lowStockCount,
    outOfStockCount,
    productsForValue,
    recentProducts,
    productsForChart,
  ] = await Promise.all([
    prisma.product.count({ where: { userId } }),

    prisma.product.count({
      where: { userId, quantity: { gt: 5 } },
    }),

    prisma.product.count({
      where: {
        userId,
        quantity: { lte: 5, gte: 1 },
      },
    }),

    prisma.product.count({
      where: { userId, quantity: 0 },
    }),

    prisma.product.findMany({
      where: { userId },
      select: { price: true, quantity: true },
    }),

    prisma.product.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),

    prisma.product.findMany({
      where: { userId },
      select: { createdAt: true },
    }),
  ]);

  return {
    totalProducts,
    lowStockCount, // 🔥 add this
    inStockCount,
    outOfStockCount,
    recentProducts,
    productsForChart,
    totalValue: calculateTotalValue(toProductValueDTO(productsForValue)),
    ...calculatePercentages({
      totalProducts,
      inStockCount,
      lowStockCount,
      outOfStockCount,
    }),
    weeklyProductsData: calculateWeeklyProducts(productsForChart),
  };
}
