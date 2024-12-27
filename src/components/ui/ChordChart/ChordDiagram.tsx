"use client";

import React, { useState, useEffect } from "react";
import ChordDiagramClientWrapper from "./wrapper";
import Card from "@/components/ui/Card/Card";
import processData from "../../../../data/processData";

const ChordCard: React.FC = () => {
  const [matrix, setMatrix] = useState<number[][]>([]);
  const [nodes, setNodes] = useState<string[]>([]);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [connections, setConnections] = useState<number[]>([]);

  useEffect(() => {
    const { matrix, uniqueNodes } = processData.processChordData(processData.messages);

    const nodeConnections = uniqueNodes.map((_, i) =>
      matrix[i].reduce((sum, val) => sum + val, 0) +
      matrix.reduce((sum, row) => sum + row[i], 0)
    );

    setMatrix(matrix);
    setNodes(uniqueNodes);
    setConnections(nodeConnections);
  }, []);

  const handleRowHover = (node: string | null) => setHoveredNode(node);

  const handleRowClick = (node: string) => {
    setSelectedNode((prevSelectedNode) => (prevSelectedNode === node ? null : node));
  };

  return (
    <Card
      title="Encoder-Decoder Relationships"
      description="Visualize encoder-decoder interactions and relationships."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart Section */}
        <div className="flex justify-center items-center">
          <div
            className="svg-container"
            style={{
              width: "100%",
              maxWidth: "400px",
              height: "400px",
              padding: "10px",
              boxSizing: "border-box",
            }}
          >
            <ChordDiagramClientWrapper
              matrix={matrix}
              nodes={nodes}
              hoveredNode={hoveredNode}
              selectedNode={selectedNode}
            />
          </div>
        </div>

        {/* Legend Section */}
        <div style={{ overflow: "hidden" }}>
          <h3 className="text-lg font-semibold text-center mb-4">Legend: Nodes and Connections</h3>
          <table className="table-auto w-full border-collapse border border-gray-300 text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2 text-center">Color</th>
                <th className="border px-4 py-2 text-left">Node</th>
                <th className="border px-4 py-2 text-right">Connections</th>
              </tr>
            </thead>
            <tbody>
              {nodes.map((node, index) => (
                <tr
                  key={node}
                  className={`${
                    hoveredNode === node || selectedNode === node ? "bg-gray-200" : ""
                  }`}
                  onMouseEnter={() => handleRowHover(node)}
                  onMouseLeave={() => handleRowHover(null)}
                  onClick={() => handleRowClick(node)}
                >
                  <td className="border px-4 py-2 text-center">
                    <div
                      className="w-4 h-4 rounded-full mx-auto"
                      style={{
                        backgroundColor: `hsl(${(index * 137) % 360}, 70%, 50%)`,
                      }}
                    ></div>
                  </td>
                  <td className="border px-4 py-2">{node}</td>
                  <td className="border px-4 py-2 text-right">{connections[index]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
};

export default ChordCard;
