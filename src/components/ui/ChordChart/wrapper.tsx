"use client";

import React from "react";
import ChordDiagram from "react-chord-diagram";

const ChordDiagramClientWrapper = ({
  matrix,
  nodes,
  hoveredNode,
  selectedNode,
}: {
  matrix: number[][];
  nodes: string[];
  hoveredNode: string | null;
  selectedNode: string | null;
}) => {
  return (
    <div className="chord-diagram-wrapper">
      <ChordDiagram
        matrix={matrix}
        componentId={1}
        groupLabels={nodes}
        groupColors={nodes.map((_, i) =>
          hoveredNode === nodes[i] || selectedNode === nodes[i]
            ? `hsl(${(i * 137) % 360}, 80%, 40%)` // Highlight on hover or select
            : `hsl(${(i * 137) % 360}, 70%, 50%)`
        )}
        arcHoverOpacity={hoveredNode ? 0.9 : 0.7}
        arcWidth={0.1}
        ribbonHoverOpacity={hoveredNode ? 0.9 : 0.7}
        width={400}
        height={400}
        labelColors={() => "#000"}
        labelFontSize={10}
        labelDistance={50}
        labelRotate={true}
      />
    </div>
  );
};

export default ChordDiagramClientWrapper;
