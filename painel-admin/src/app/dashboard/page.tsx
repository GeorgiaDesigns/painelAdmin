"use client";
import React from "react";
import ChartCard from "../ui/components/ChartCard";
import { logout } from "../login/actions";
import GaugeChart from "../ui/components/GaugeChart";
import BarChart from "../ui/components/BarChart";
import Button from "../ui/components/Button";
import LineChart from "../ui/components/LineChart";

const Page = () => {
  return (
    <div className="p-10">
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
      <Button
        className="absolute bottom-10 left-10 "
        label="Sair da conta"
        onClick={() => logout()}
      />
    </div>
  );
};

export default Page;
