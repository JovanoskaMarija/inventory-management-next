import ProductChart from "@/components/product-chart";
import Sidebar from "@/components/sidebar";
import { getCurrentUser } from "@/lib/auth";
import { getDashboardData } from "./dashboard.service";

import { TrendingUp } from "lucide-react";
export default async function DashboardPage() {
  const user = await getCurrentUser();

  const {
    totalProducts,
    totalValue,
    recentProducts,
    weeklyProductsData,
    inStockPercentage,
    lowStockPercentage,
    outOfStockPercentage,
    lowStockCount,
  } = await getDashboardData(user.id);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar currentPath="/dashboard" />
      <main className="ml-64 p-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Dashboard
              </h1>
              <p className="text-sm text-gray-500">
                Here is an overview of your inventory.
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-500 mb-6">
                Key Metrics
              </h2>
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">
                    {totalProducts}
                  </div>
                  <div className="text-sm text-gray-600">Total Products</div>
                  <div className="flex items-center justify-center mt-1">
                    <span className="text-xs text-green-600">
                      +{totalProducts}
                    </span>
                    <TrendingUp className="w-3 h-3 text-green-600 ml-1" />
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">
                    ${Number(totalValue).toFixed(0)}
                  </div>
                  <div className="text-sm text-gray-600">Total Value</div>
                  <div className="flex items-center justify-center mt-1">
                    <span className="text-xs text-green-600">
                      +${Number(totalValue).toFixed(0)}
                    </span>
                    <TrendingUp className="w-3 h-3 text-green-600 ml-1" />
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">
                    {lowStockCount}
                  </div>
                  <div className="text-sm text-gray-600">Low Stock</div>
                  <div className="flex items-center justify-center mt-1">
                    <span className="text-xs text-green-600">
                      +{lowStockCount}
                    </span>
                    <TrendingUp className="w-3 h-3 text-green-600 ml-1" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-500 mb-6">
                  New products per week
                </h2>
              </div>
              <div className="h-48">
                <ProductChart data={weeklyProductsData} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-500 mb-6">
                Stock Trends
              </h2>

              <div className="space-y-3">
                {recentProducts.map((item, index) => {
                  const stockLevel =
                    item.quantity === 0
                      ? 0
                      : item.quantity <= (item.lowStockAt || 5)
                        ? 1
                        : 2;

                  const bgColors = [
                    "bg-red-600",
                    "bg-yellow-500",
                    "bg-green-500",
                  ];
                  const textColors = [
                    "text-red-600",
                    "text-yellow-500",
                    "text-green-500",
                  ];
                  return (
                    <div
                      key={index}
                      className="flex justify-between items-center p-3 rounded-lg bg-gray-50"
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-3 h-3 rounded-full ${bgColors[stockLevel]}`}
                        />
                        <span>{item.name}</span>
                      </div>
                      <div
                        className={`text-sm font-medium ${textColors[stockLevel]}`}
                      >
                        {item.quantity} units
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-500">
                  Efficiency
                </h2>
              </div>

              <div className="flex items-center justify-center">
                <div className="relative w-48 h-48">
                  <div className="absolute inset-0 rounded-full border-8 border-gray-200" />
                  <div
                    className="absolute inset-0 rounded-full border-8 border-purple-600"
                    style={{
                      clipPath:
                        "polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%)",
                    }}
                  />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">
                        {inStockPercentage}%
                      </div>
                      <div className="text-sm text-gray-600">In Stock</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 space-y-2">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-purple-200" />
                    <span>In Stock ({inStockPercentage}%)</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-purple-600" />
                    <span>Low Stock ({lowStockPercentage}%)</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-gray-200" />
                    <span>Out of Stock ({outOfStockPercentage}%)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
