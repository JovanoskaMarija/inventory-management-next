"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";

type DeleteProductsInput = {
  ids: string[];
};

export async function deleteProducts(input: DeleteProductsInput) {
  const user = await getCurrentUser();

  await prisma.product.deleteMany({
    where: {
      id: { in: input.ids },
      userId: user.id,
    },
  });
  revalidatePath("/inventory");
}
