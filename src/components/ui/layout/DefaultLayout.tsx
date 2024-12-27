'use client';

import { useState } from "react";
import SidebarComponent from "@/components/ui/Sidebar/SidebarComponent";
import PieCard from "@/components/ui/PieChart/chart";
import BubbleCard from "@/components/ui/BubbleChart/BubbleChart";
import TreemapCard from "@/components/ui/TreemapChart/TreemapChart";
import ContextStackedBarCard from "@/components/ui/barChart/BarChart";
import ChordCard from "@/components/ui/ChordChart/ChordDiagram";
import EncoderDecoderBarChart from "@/components/ui/StackedBarChart/stackedBarChart";
import HeadComponent from "@/components/ui/Head/HeadComponent";
import Image from 'next/image';

interface DashboardItem {
  name: string;
  component: JSX.Element;
}

const dashboardItems: DashboardItem[] = [
  { name: "Message Categories Distribution", component: <PieCard /> },
  { name: "Communication Methods", component: <BubbleCard /> },
  { name: "Referenced Documents Frequency", component: <TreemapCard /> },
  { name: "Temporal & Spatial Contexts Overview", component: <ContextStackedBarCard /> },
  { name: "Encoder-Decoder Relationships", component: <ChordCard /> },
  { name: "Encoder-Decoder Analysis", component: <EncoderDecoderBarChart /> },
];

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  const [activeChart, setActiveChart] = useState<string | null>(null);

  const renderContent = () => {
    if (!activeChart) {
      return (
        <div className="grid grid-cols-2 gap-8">
          {dashboardItems.map((item) => (
            <div
              key={item.name}
              className="card flex flex-col p-6 shadow-lg rounded-lg bg-white border border-gray-300 hover:cursor-pointer hover:shadow-xl"
              onClick={() => setActiveChart(item.name)}
            >
              <h2 className="text-xl font-bold text-center">{item.name}</h2>
            </div>
          ))}







<div className="col-span-2">
  <h1 className="font-bold pb-4">Overview</h1>
  <div className="card flex flex-wrap p-6 shadow-lg rounded-lg bg-white border border-gray-300 hover:cursor-pointer hover:shadow-xl gap-4 justify-evenly">
    <div>
      <h1>Communication Model</h1>
      <figure>
        <Image
          width={100}
          height={100}
          src="/figure1_v1.svg"
          alt="figure"
          className="w-auto h-auto bg-blue-500 p-1"
        />
        <figcaption>
          Different actors communicate during a dive:
          <ol className="list-decimal ml-5">
            <li>Geographical Positioning System (GPS)</li>
            <li>Autonomous Surface Vehicles (ASVs)</li>
            <li>Autonomous Underwater Vehicles (AUVs)</li>
          </ol>
        </figcaption>
      </figure>
              </div>


<div className=" flex flex-col items-start gap-2  ">
  <h1>Message Encoders & Decoders</h1>
  {[
    { src: "/diver.svg", caption: "Diver" },
    { src: "/auv.svg", caption: "Autonomous Underwater Vehicle (AUV)" },
    { src: "/surface.svg", caption: "Surface-Supporting Personnel" }
  ].map((item, index) => (
    <figure key={index} className="flex items-center  gap-2 " >
      <Image
        width={50}
        height={50}
        src={item.src}
        alt="figure"
        className="w-15 h-15 bg-blue-500 p-1 "
      />
      <figcaption className="text-center">{item.caption}</figcaption>
    </figure>
  ))}
              </div>






<div className=" flex flex-col items-start gap-2">
  <h1>Spatial & Temporal Context</h1>
  {[
    { src: "/colocated.svg", caption: "Colocated" },
    { src: "/remote.svg", caption: "Remote" },
    { src: "/sync.svg", caption: "Synchronous" },
    { src: "/async.svg", caption: "Asynchronous" }
  ].map((item, index) => (
    <figure key={index} className="flex items-center gap-2">
      <Image
        width={50}
        height={50}
        src={item.src}
        alt="figure"
        className="w-15 h-15 bg-blue-500 p-1"
      />
      <figcaption className="text-center">{item.caption}</figcaption>
    </figure>
  ))}
</div>
<div className="flex flex-col items-start gap-2">
  <h1>Communication Methods</h1>
  {[
    { src: "/body_language.svg", caption: "Body Language" },
    { src: "/flags_buoys.svg", caption: "Flags & Buoys" },
    { src: "/hand_signaling.svg", caption: "Hand Signals" },
    { src: "/light_signaling.svg", caption: "Light Signals" },
    { src: "/line_marker.svg", caption: "Line Markers" },
    { src: "/line_pulling.svg", caption: "Line Pulling" }
  ].map((item, index) => (
    <figure key={index} className="flex items-center gap-2 ">
      <Image
        width={50}
        height={50}
        src={item.src}
        alt="figure"
        className="w-15 h-15 bg-blue-500 p-1"
      />
      <figcaption className="text-center">{item.caption}</figcaption>
    </figure>
  ))}
</div>
  </div>
</div>
        </div>
      );
    }

    const selectedItem = dashboardItems.find((item) => item.name === activeChart);
    return selectedItem ? selectedItem.component : <div>Chart not found</div>;
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarComponent setActiveChart={setActiveChart} />
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden ml-52">
        <HeadComponent />
        <div className="mt-20">
          <main className="h-full">
            <div className="mx-auto max-w-screen-3xl px-4">{renderContent()}</div>
          </main>
        </div>
      </div>
    </div>
  );
}