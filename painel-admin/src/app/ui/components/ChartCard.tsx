import React from "react";

type ChartCardProps = {
  children: React.ReactNode;
  label: string;
};

export default function ChartCard({ label, children }: ChartCardProps) {
  return (
    <div className="relative w-[100%] h-[400px] bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-10 rounded-lg shadow-lg p-10 text-white flex flex-col justify-center">
      <h3 className="text-2xl text-left mb-8">{label}</h3>

      {children}
    </div>
  );
}
