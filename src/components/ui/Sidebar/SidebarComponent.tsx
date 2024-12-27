import React from "react";
import Image from 'next/image';

interface SidebarProps {
  setActiveChart: (chart: string | null) => void;
}

const SidebarComponent: React.FC<SidebarProps> = ({ setActiveChart }) => {
  const chartTypes = [
    { name: "Dashboard", value: null },
    { name: "Pie Chart", value: "Message Categories Distribution" },
    { name: "Bubble Chart", value: "Communication Methods"  },
    { name: "Treemap Chart", value: "Referenced Documents Frequency"  },
    { name: "Bar Chart", value: "Temporal & Spatial Contexts Overview" },
    { name: "Chord Chart", value: "Encoder-Decoder Relationships" },
    { name: "Stacked Bar Chart", value: "Encoder-Decoder Analysis" },
  ];

  return (
    <aside
      style={{
        width: "208px",
        height: "100vh",
        background: "linear-gradient(to bottom, black, #4682B4)",
        padding: "1rem",
        position: "fixed",
      }}
    >
<Image
  src="/underwater.svg"
  alt="Underwater Logo"
  width={100}
        height={100}
  style={{ width: "auto", height: "auto", paddingBottom: "3rem" }}
/>



      {/* Dashboard as the main header element */}
      <div
        style={{
          marginBottom: "2rem",
          padding: "0.5rem 1rem",
          borderRadius: "5px",
          cursor: "pointer",
          transition: "background-color 0.2s ease, color 0.2s ease",
          color: "white",
          fontWeight: "bold",
          fontSize: "1.2rem",
          textAlign: "center",
        }}
        onClick={() => setActiveChart(chartTypes[0].value)}
        onMouseEnter={(e) => {
          (e.target as HTMLElement).style.backgroundColor = "#5A9BD5";
          (e.target as HTMLElement).style.color = "white";
        }}
        onMouseLeave={(e) => {
          (e.target as HTMLElement).style.backgroundColor = "transparent";
          (e.target as HTMLElement).style.color = "white";
        }}
      >
        {chartTypes[0].name}
      </div>

      {/* Remaining chart types */}
      <ul style={{ listStyle: "none", padding: "1rem", color: "white" }}>
        {chartTypes.slice(1).map((chart) => (
          <li
            key={chart.name}
            style={{
              marginBottom: "1rem",
              padding: "0.5rem 1rem",
              borderRadius: "5px",
              cursor: "pointer",
              transition: "background-color 0.2s ease, color 0.2s ease",
            }}
            onClick={() => setActiveChart(chart.value)}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.backgroundColor = "#5A9BD5";
              (e.target as HTMLElement).style.color = "white";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.backgroundColor = "transparent";
              (e.target as HTMLElement).style.color = "white";
            }}
          >
            {chart.name}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default SidebarComponent;
