"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { productSchema } from "@/schemas/product.schema";

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

export async function addProduct(formData: FormData) {
  const user = await getCurrentUser();

  const rawData = {
    name: formData.get("name"),
    price: Number(formData.get("price")),
    quantity: Number(formData.get("quantity")),
    sku: formData.get("sku") || undefined,
    lowStockAt:
      formData.get("lowStockAt") === "" || formData.get("lowStockAt") == null
        ? undefined
        : Number(formData.get("lowStockAt")),
  };

  const parsed = productSchema.safeParse(rawData);

  if (!parsed.success) {
    return {
      success: false,
      message: "Invalid product data",
    };
  }

  try {
    await prisma.product.create({
      data: {
        ...parsed.data,
        userId: user.id,
      },
    });

    return {
      success: true,
      message: "Product added successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed to add product, ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}
