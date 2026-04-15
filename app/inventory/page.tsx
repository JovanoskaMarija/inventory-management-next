import Pagination from "@/components/pagination";
import Sidebar from "@/components/sidebar";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { toProductDTO } from "@/lib/mappers/product.mapper";
import { InventoryTable } from "./inventory-table";
import { InventorySearch } from "./inventory-search";

export default async function InventoryPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const user = await getCurrentUser();
  const userId = user.id;

  const params = await searchParams;
  const q = (params.q ?? "").trim();

  const where = {
    userId,
    ...(q ? { name: { contains: q, mode: "insensitive" as const } } : {}),
  };

  const pageSize = 10;
  const page = Math.max(1, Number(params.page) || 1);

  const [totalProductCount, rawProducts] = await Promise.all([
    prisma.product.count({ where }),
    prisma.product.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const products = toProductDTO(rawProducts);

  const totalPages = Math.max(1, Math.ceil(totalProductCount / pageSize));

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar currentPath="/inventory" />
      <main className="ml-64 p-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Inventory
              </h1>
              <p className="text-sm text-gray-500">
                Manage your products and stock levels here.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <InventorySearch q={q} />

          <InventoryTable products={products} />

          {totalPages > 1 && (
            <div className="bg-white rounded-lg border border-gray-200 p-g">
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                baseUrl="/inventory"
                searchParams={{ q, pageSize: String(pageSize) }}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
