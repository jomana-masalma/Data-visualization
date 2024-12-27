"use client";

import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer, Label } from "recharts";
import Card from "@/components/ui/Card/Card";
import processData from "../../../../data/processData";

const categoryColors: Record<string, string> = {
  CO: "#FF6347",
  NP: "#3CB371",
  SE: "#4682B4",
  EE: "#FFD700",
  EC: "#FF8C00",
  ECM: "#000000",
  QI: "#DC143C",
  WS: "#20B2AA",
};

const categoryFullNames: Record<string, string> = {
  CO: "Coordination",
  NP: "Navigation & Positioning",
  SE: "Safety & Emergency",
  EE: "Emotion & Expression",
  EC: "Environment Conditions",
  ECM: "Equipment & Communication",
  QI: "Quantitative Information",
  WS: "Wildlife Sightings",
};

interface ChartData {
  category: string;
  value: number;
  fill: string;
}

const PieCard: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const data = processData.categorizedBySemantic.map((item) => ({
      ...item,
      fill: categoryColors[item.category] || "#ccc",
    }));
    setChartData(data);
  }, []);

  return (
    <Card
      title="Message Categories"
      description="Semantic Category Distribution"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart Section */}
        <div className="flex justify-center items-center">
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="category"
                cx="50%"
                cy="50%"
                innerRadius={100}
                outerRadius={150}
                onMouseEnter={(_, index) => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                labelLine={false}
                label={(entry) => `${entry.value}`}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={entry.category}
                    fill={entry.fill}
                    style={{
                      transform: hoveredIndex === index ? "scale(1.1)" : "scale(1)",
                      transformOrigin: "center",
                      transition: "transform 0.2s ease-in-out",
                    }}
                    stroke={hoveredIndex === index ? "#000" : entry.fill}
                    strokeWidth={hoveredIndex === index ? 2 : 1}
                  />
                ))}
                <Label
                  value="Category Distribution"
                  position="centerBottom"
                  className="text-lg font-semibold"
                />
              </Pie>
              <Tooltip formatter={(value, name) => [`${value}`, `${name} (${categoryFullNames[name]})`]} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Table Section */}
        <div>
          <h3 className="text-lg font-semibold text-center">Category Details</h3>
          <table className="table-auto w-full mt-4 border-collapse border border-gray-300 text-sm">
            <thead>
              <tr>
                <th className="border px-4 py-2">Color</th>
                <th className="border px-4 py-2 text-left">Abbreviation</th>
                <th className="border px-4 py-2 text-left">Full Name</th>
                <th className="border px-4 py-2 text-right">Count</th>
              </tr>
            </thead>
            <tbody>
              {chartData.map((entry, index) => (
                <tr
                  key={entry.category}
                  className={`${hoveredIndex === index ? "bg-gray-200" : ""}`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <td className="border px-4 py-2 text-center">
                    <div
                      className="w-4 h-4 rounded-full mx-auto"
                      style={{ backgroundColor: categoryColors[entry.category] }}
                    ></div>
                  </td>
                  <td className="border px-4 py-2">{entry.category}</td>
                  <td className="border px-4 py-2">{categoryFullNames[entry.category]}</td>
                  <td className="border px-4 py-2 text-right">{entry.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
};

export default PieCard;
