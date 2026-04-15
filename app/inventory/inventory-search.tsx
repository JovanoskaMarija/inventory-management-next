import { buildUrl } from "@/lib/utils";

export function InventorySearch({ q }: { q: string }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <form
        className="flex gap-2"
        action={buildUrl("/inventory", { q, page: 1 })}
        method="GET"
      >
        <input
          name="q"
          defaultValue={q}
          placeholder="Search products..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
        />
        <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
          Search
        </button>
      </form>
    </div>
  );
}
