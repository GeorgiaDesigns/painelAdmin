"use client";
import React from "react";
import LogoutButton from "../ui/components/LogoutButton";
import ChartGrid from "../ui/components/ChartGrid";

const Page = () => {
  return (
    <div className="p-10">
      <h3 className="text-2xl font-semibold text-left mb-8">
        Dados sobre episódios de Rick and Morty
      </h3>

      <ChartGrid />
      <div className="absolute bottom-10 left-10 ">
        <LogoutButton />
      </div>
    </div>
  );
};

export default Page;
