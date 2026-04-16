import Sidebar from "@/components/sidebar";
import AddProductForm from "./add-product-form";

export default function AddProductPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar currentPath="/add-product" />

      <main className="ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Add Product</h1>
          <p className="text-sm text-gray-500">
            Add a new product to your inventory.
          </p>
        </div>

        <div className="max-w-2xl bg-white rounded-lg border border-gray-200 p-6">
          <AddProductForm />
        </div>
      </main>
    </div>
  );
}
