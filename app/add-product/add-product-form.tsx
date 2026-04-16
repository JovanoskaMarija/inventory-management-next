"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, ProductFormValues } from "@/schemas/product.schema";
import { Input } from "@/components/input";
import { FormField } from "@/components/form-field";
import { addProduct } from "@/lib/actions/products";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import Link from "next/link";

export default function AddProductForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      quantity: 0,
      price: 0,
      sku: "",
      lowStockAt: undefined,
    },
  });

  const onSubmit = (data: ProductFormValues) => {
    startTransition(async () => {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("price", String(data.price));
      formData.append("quantity", String(data.quantity));

      if (data.sku) formData.append("sku", data.sku);
      if (data.lowStockAt !== undefined) {
        formData.append("lowStockAt", String(data.lowStockAt));
      }

      const res = await addProduct(formData);

      if (res.success) {
        toast.success(res.message);

        requestAnimationFrame(() => {
          router.push("/inventory");
        });
      } else {
        toast.error(res.message);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <FormField
        label="Product Name *"
        htmlFor="name"
        error={errors.name?.message}
      >
        <Input id="name" {...register("name")} disabled={isPending} />
      </FormField>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Quantity *"
          htmlFor="quantity"
          error={errors.quantity?.message}
        >
          <Input
            type="number"
            {...register("quantity", { valueAsNumber: true })}
            disabled={isPending}
          />
        </FormField>

        <FormField
          label="Price *"
          htmlFor="price"
          error={errors.price?.message}
        >
          <Input
            type="number"
            step={0.01}
            {...register("price", { valueAsNumber: true })}
            disabled={isPending}
          />
        </FormField>
      </div>

      <FormField label="SKU" htmlFor="sku" error={errors.sku?.message}>
        <Input {...register("sku")} disabled={isPending} />
      </FormField>

      <FormField
        label="Low Stock Threshold"
        htmlFor="lowStockAt"
        error={errors.lowStockAt?.message}
      >
        <Input
          type="number"
          {...register("lowStockAt", {
            setValueAs: (v) => (v === "" ? undefined : Number(v)),
          })}
          disabled={isPending}
        />
      </FormField>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isPending}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-purple-300"
        >
          {isPending ? "Adding..." : "Add Product"}
        </button>

        <Link
          href="/inventory"
          className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
