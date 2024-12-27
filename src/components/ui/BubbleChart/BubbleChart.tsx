"use client";

import React, { useEffect, useState } from "react";
import {
  ScatterChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Scatter,
} from "recharts";
import Card from "@/components/ui/Card/Card";
import processData from "../../../../data/processData"; // Adjust path as needed

interface BubbleChartData {
  category: string;
  value: number;
  size: number;
}

const BubbleCard: React.FC = () => {
  const [bubbleData, setBubbleData] = useState<BubbleChartData[]>([]);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  useEffect(() => {
    const data = processData.categorizedByType.map((item) => ({
      category: item.category,
      value: Math.log10(item.value + 1), // Log scale for better spread
      size: item.value,
    }));
    setBubbleData(data);
  }, []);

  const handleMouseEnter = (category: string) => {
    setHoveredCategory(category);
  };

  const handleMouseLeave = () => {
    setHoveredCategory(null);
  };

  return (
    <Card
      title="Communication Methods"
      description="Interactive Line & Bubble Chart to comunication methods"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart Section */}
        <div className="flex justify-center items-center">
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart>
              <CartesianGrid />
              <XAxis dataKey="category" name="Message Type" />
              <YAxis dataKey="value" name="Log Count" />
              <Tooltip
                cursor={{ strokeDasharray: "6 6" }}
                formatter={(value: number, name: string) =>
                  name === "Log Count"
                    ? [value.toFixed(2), "Log Count"]
                    : [value, name]
                }
              />
              <Legend />
              <Scatter
                name="Message Types"
                data={bubbleData}
                fill="#8884d8"
                line={{ stroke: "#82ca9d", strokeWidth: 2 }}
                dataKey="size"
                onMouseEnter={(data) => setHoveredCategory(data.category)}
                onMouseLeave={() => setHoveredCategory(null)}
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        {/* Table Section */}
        <div>
          <h3 className="text-lg font-semibold text-center">
            Communication Method Counts
          </h3>
          <table className="table-auto w-full mt-4 border-collapse border border-gray-300 text-sm">
            <thead>
              <tr>
                <th className="border px-4 py-2">Message Type</th>
                <th className="border px-4 py-2">Count</th>
              </tr>
            </thead>
            <tbody>
              {bubbleData.map((item) => (
                <tr
                  key={item.category}
                  className={`${
                    hoveredCategory === item.category ? "bg-gray-200" : ""
                  }`}
                  onMouseEnter={() => handleMouseEnter(item.category)}
                  onMouseLeave={handleMouseLeave}
                >
                  <td className="border px-4 py-2">{item.category}</td>
                  <td className="border px-4 py-2">{item.size}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
};

export default BubbleCard;
