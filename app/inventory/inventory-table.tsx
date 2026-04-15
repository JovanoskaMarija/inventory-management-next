"use client";
import { deleteProducts } from "@/lib/actions/products";
import { useState, useTransition } from "react";
import { ProductDTO } from "@/lib/mappers/product.mapper";

interface InventoryTableProps {
  products: ProductDTO[];
}

export function InventoryTable({ products }: InventoryTableProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === products.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(products.map((p) => p.id));
    }
  };

  const handleDeleteSelected = () => {
    const ids = selectedIds;

    startTransition(() => {
      deleteProducts({ ids });

      setSelectedIds([]);
    });
  };

  const handleDelete = (id: string) => {
    setSelectedIds((prev) => prev.filter((x) => x !== id));
    startTransition(() => {
      deleteProducts({ ids: [id] });
    });
  };

  return (
    <div className={tableWrapper}>
      {selectedIds.length > 0 && (
        <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg mb-4">
          <span className="text-sm text-gray-700">
            {selectedIds.length} selected
          </span>

          <button
            onClick={handleDeleteSelected}
            disabled={isPending}
            className="text-red-600 font-medium disabled:opacity-50"
          >
            {isPending ? "Deleting..." : "Delete selected"}
          </button>
        </div>
      )}
      <table className="w-full">
        <thead className={tableHeaderRow}>
          <tr>
            <th className={tableHeaderCell}>
              <input
                type="checkbox"
                checked={
                  selectedIds.length === products.length && products.length > 0
                }
                onChange={toggleSelectAll}
              />
            </th>
            <th className={tableHeaderCell}>Name</th>
            <th className={tableHeaderCell}>SKU</th>
            <th className={tableHeaderCell}>Price</th>
            <th className={tableHeaderCell}>Quantity</th>
            <th className={tableHeaderCell}>Low Stock At</th>
            <th className={tableHeaderCell}>Actions</th>
          </tr>
        </thead>

        <tbody className={tableBody}>
          {products.map((product) => (
            <tr key={product.id}>
              <td className={tableCell}>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(product.id)}
                  onChange={() => toggleSelect(product.id)}
                />
              </td>
              <td className={tableCell}>{product.name}</td>
              <td className={tableCell}>{product.sku ?? "-"}</td>
              <td className={tableCell}>${Number(product.price).toFixed(2)}</td>
              <td className={tableCell}>{product.quantity}</td>
              <td className={tableCell}>{product.lowStockAt ?? "-"}</td>

              <td className={tableCell}>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const tableWrapper =
  "bg-white rounded-lg border border-gray-200 overflow-hidden";

const tableHeaderCell =
  "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase";

const tableCell = "px-6 py-4 whitespace-nowrap text-sm text-gray-500";

const tableHeaderRow = "bg-gray-50";

const tableBody = "bg-white divide-y divide-gray-200";
