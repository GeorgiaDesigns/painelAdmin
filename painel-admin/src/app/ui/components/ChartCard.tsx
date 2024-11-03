import React from "react";

type ChartCardProps = {
  children: React.ReactNode;
};

export default function ChartCard({ children }: ChartCardProps) {
  return (
    <div className="relative w-[400px] h-[520px] bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-10 rounded-lg shadow-lg p-10 text-white flex flex-col justify-center">
      {children}
    </div>
  );
}
