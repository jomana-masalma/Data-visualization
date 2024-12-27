"use client";

import React, { useEffect, useState } from "react";
import { Treemap, Tooltip, ResponsiveContainer } from "recharts";
import Card from "@/components/ui/Card/Card";
import processData from "../../../../data/processData"; // Adjust the path as needed

interface TreemapData {
  name: string;
  value: number;
  fill: string;
}

const generateCategoryColors = (categories: string[]): Record<string, string> => {
  const baseColors = [
    "#FF6347", "#3CB371", "#4682B4", "#FFD700", "#FF8C00", "#DC143C",
    "#20B2AA", "#8A2BE2", "#00008B", "#CCCCCC", "#FF69B4", "#32CD32",
    "#4B0082", "#FF4500", "#2E8B57", "#9400D3", "#00CED1", "#B8860B",
    "#4169E1", "#8B0000", "#B22222", "#5F9EA0", "#9ACD32", "#FFA07A",
  ];

  return categories.reduce((acc, category, index) => {
    acc[category] = baseColors[index % baseColors.length];
    return acc;
  }, {} as Record<string, string>);
};

const TreemapCard: React.FC = () => {
  const [treemapData, setTreemapData] = useState<TreemapData[]>([]);
  const [categoryColors, setCategoryColors] = useState<Record<string, string>>({});
  const [hoveredName, setHoveredName] = useState<string | null>(null);

  useEffect(() => {
    const allReferences = processData.messages.flatMap((msg) => msg.references);
    const uniqueReferences = Array.from(new Set(allReferences));
    const colors = generateCategoryColors(uniqueReferences);

    const data = uniqueReferences.map((ref) => ({
      name: ref,
      value: allReferences.filter((item) => item === ref).length,
      fill: colors[ref],
    }));

    setTreemapData(data.sort((a, b) => b.value - a.value));
    setCategoryColors(colors);
  }, []);

  const CustomTreemapContent = (props: any) => {
    const { x, y, width, height, name, fill } = props;
    const minimumSize = Math.min(width, height);
    const isSmall = minimumSize < 20;

    return (
      <g
        onMouseEnter={() => setHoveredName(name)}
        onMouseLeave={() => setHoveredName(null)}
      >
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill,
            stroke: hoveredName === name ? "#000" : "#fff",
            strokeWidth: hoveredName === name ? 2 : 1,
          }}
        />
        {!isSmall && (
          <text
            x={x + width / 2}
            y={y + height / 2}
            textAnchor="middle"
            fill="#fff"
            fontSize={Math.max(10, Math.min(minimumSize / 5, 14))}
          >
            {name}
          </text>
        )}
      </g>
    );
  };

  return (
    <Card
      title="Referenced Document Distribution"
      description="Explore number of message references."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart Section */}
        <div className="flex justify-center items-center">
          <ResponsiveContainer width="100%" height={400}>
            <Treemap
              data={treemapData}
              dataKey="value"
              nameKey="name"
              stroke="#fff"
              fill="#8884d8"
              content={<CustomTreemapContent />}
            >
              <Tooltip
                formatter={(value: number, name: string) => [`${value}`, `Reference: ${name}`]}
                cursor={{ strokeDasharray: "3 3" }}
              />
            </Treemap>
          </ResponsiveContainer>
        </div>

        {/* Table Section */}
        <div>
          <h3 className="text-lg font-semibold text-center">Legend: References and Counts</h3>
          <table className="table-auto w-full mt-4 border-collapse border border-gray-300 text-sm">
            <thead>
              <tr>
                <th className="border px-4 py-2">Color</th>
                <th className="border px-4 py-2 text-left">Reference</th>
                <th className="border px-4 py-2 text-left">Count</th>
              </tr>
            </thead>
            <tbody>
              {treemapData.map((item) => (
                <tr
                  key={item.name}
                  className={`${hoveredName === item.name ? "bg-gray-200" : ""}`}
                  onMouseEnter={() => setHoveredName(item.name)}
                  onMouseLeave={() => setHoveredName(null)}
                >
                  <td className="border px-4 py-2 text-center">
                    <div
                      className="w-4 h-4 rounded-full mx-auto"
                      style={{ backgroundColor: item.fill }}
                    ></div>
                  </td>
                  <td className="border px-4 py-2">{item.name}</td>
                  <td className="border px-4 py-2">{item.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
};

export default TreemapCard;
