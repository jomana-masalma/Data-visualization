"use client";

import React from "react";

interface CardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, description, children }) => {
  return (
    <div className="card flex flex-col p-6 shadow-lg rounded-lg bg-white mx-auto w-full max-w-7xl">
      <div className="card-header mb-4 text-center">
        <h2 className="text-2xl font-bold">{title}</h2>
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </div>
      <div className="card-content flex-1">{children}</div>
    </div>
  );
};

export default Card;
