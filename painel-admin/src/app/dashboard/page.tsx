"use client";
import React from "react";
import ChartCard from "../ui/components/ChartCard";
import GaugeChart from "../ui/components/GaugeChart";
import BarChart from "../ui/components/BarChart";
import LineChart from "../ui/components/LineChart";
import LogoutButton from "../ui/components/LogoutButton";

const Page = () => {
  return (
    <div className="p-10">
      <h3 className="text-2xl font-semibold text-left mb-8">
        Dados sobre episódios de Rick and Morty
      </h3>

      <div className="grid grid-cols-3 gap-4 items-center justify-items-center">
        <ChartCard label={"Residentes por planeta"}>
          <GaugeChart endpoint="locations" />
        </ChartCard>

        <ChartCard label={"Status dos Personagens"}>
          <BarChart
            indexBy={"status"}
            keys={["Vivos", "Mortos"]}
            endpoint="charactersbyStatus"
          />
        </ChartCard>

        <ChartCard label={"Personagens por episódio"}>
          <LineChart endpoint="charactersperEpisode" />
        </ChartCard>
      </div>
      <div className="absolute bottom-10 left-10 ">
        <LogoutButton />
      </div>
    </div>
  );
};

export default Page;
