"use client";
import React, { useEffect, useState } from "react";
import ChartCard from "../ui/components/ChartCard";
import { logout } from "../login/actions";
import { fetchLocations } from "./actions";
import GaugeChart from "../ui/components/GaugeChart";
import BarChart from "../ui/components/BarChart";
import Button from "../ui/components/Button";

const Page = () => {
  // const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [locations, setLocations] = useState<Location[]>([]);
  //   const handleShowLocation = async (location: string) => {
  //     const characters = await getCharactersFrom(location);
  //     setFilteredCharacters(characters);
  //     return;
  //   };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchLocations();
      if (data) {
        setLocations(data);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-10">
      <div className="grid grid-cols-3 gap-4 items-center justify-items-center">
        <ChartCard label={"Residentes por planeta"}>
          <GaugeChart endpoint="locations" />
        </ChartCard>

        <ChartCard label={"Residentes por planeta"}>
          <BarChart endpoint="locations" />
        </ChartCard>

        <ChartCard label={"Residentes por planeta"}>
          <BarChart endpoint="locations" />
        </ChartCard>
      </div>
      <Button
        // className="absolute bottom-10 left-10 "
        label="Sair da conta"
        onClick={() => logout()}
      />
    </div>
  );
};

export default Page;
