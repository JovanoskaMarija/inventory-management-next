import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const demoUserId = "6cec2749-33bf-41a0-8e47-3ece38883135";

  await prisma.product.createMany({
    data: Array.from({ length: 30 }).map((_, i) => ({
      userId: demoUserId,
      name: `Product ${i + 1}`,
      price: (Math.random() * 90 + 10).toFixed(2),
      quantity: Math.floor(Math.random() * 20),
      lowStockAt: 5,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 25 * (i * 5)),
    })),
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
