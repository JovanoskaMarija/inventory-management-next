"use client";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ProductChartProps {
  label: string;
  products: number;
}

export default function ProductChart({ data }: { data: ProductChartProps[] }) {
  return (
    <div className="h-48 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="label"
            stroke="#666"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#666"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            allowDecimals={false}
          />
          <Area
            type="monotone"
            dataKey="products"
            stroke="#8b5cf6"
            fill="#8b5cf6"
            fillOpacity={0.2}
            strokeWidth={2}
            dot={{ fill: "#8b5cf6", stroke: "#8b5cf6", strokeWidth: 2, r: 2 }}
            activeDot={{
              fill: "#8b5cf6",
              stroke: "#8b5cf6",
              strokeWidth: 2,
              r: 4,
            }}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "4px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              padding: "8px",
            }}
            itemStyle={{ color: "#333", fontSize: 12 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
