"use client";

import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import Card from "@/components/ui/Card/Card";
import processData from "../../../../data/processData";

const StackedBarChart: React.FC = () => {
  const temporalSpatialData = processData.processTemporalSpatialContextData();

  const colors = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff7f50",
    "#00c49f",
    "#ffbb28",
    "#a4de6c",
    "#d0ed57",
    "#8dd1e1",
  ];

  const formattedData = temporalSpatialData.map((entry, index) => ({
    ...entry,
    label: `${entry.spatialContext} (${entry.temporalContext})`,
    color: colors[index % colors.length],
  }));

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <Card
      title="Spatial & Temporal Context Distribution"
      description="Explore the relationships between spatial and temporal contexts using this bar chart and detailed table."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart Section */}
        <div className="flex justify-center items-center">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={formattedData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="category" dataKey="temporalContext" />
              <YAxis />
              <Tooltip
                formatter={(value, name, props) => [
                  value,
                  props.payload.label,
                ]}
              />
              <Legend
                formatter={(value) =>
                  formattedData.find((entry) => entry.temporalContext === value)?.label ||
                  value
                }
              />
              <Bar
                dataKey="count"
                name="Occurrences"
                onMouseEnter={(_, index) => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {formattedData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    style={{
                      transform: hoveredIndex === index ? "scale(1)" : "scale()",
                      transformOrigin: "center",
                      transition: "transform 0.2s ease-in-out",
                    }}
                    stroke={hoveredIndex === index ? "#000" : entry.color}
                    strokeWidth={hoveredIndex === index ? 2 : 1}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Table Section */}
        <div>
          <h3 className="text-lg font-semibold text-center">Detailed Data Table</h3>
          <table className="table-auto w-full mt-4 border-collapse border border-gray-300 text-sm">
            <thead>
              <tr>
                <th className="border px-4 py-2">Color</th>
                <th className="border px-4 py-2">Spatial Context</th>
                <th className="border px-4 py-2">Temporal Context</th>
                <th className="border px-4 py-2">Count</th>
              </tr>
            </thead>
            <tbody>
              {formattedData.map((entry, index) => (
                <tr
                  key={index}
                  className={`${hoveredIndex === index ? "bg-gray-200" : ""}`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <td className="border px-4 py-2 text-center">
                    <div
                      className="w-4 h-4 rounded-full mx-auto"
                      style={{ backgroundColor: entry.color }}
                    ></div>
                  </td>
                  <td className="border px-4 py-2">{entry.spatialContext}</td>
                  <td className="border px-4 py-2">{entry.temporalContext}</td>
                  <td className="border px-4 py-2 text-center">{entry.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
};

export default StackedBarChart;
