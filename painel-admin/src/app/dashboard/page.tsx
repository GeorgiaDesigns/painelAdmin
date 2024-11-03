"use client";
import React, { useEffect, useState } from "react";
import ChartCard from "../ui/components/ChartCard";
import { logout } from "../login/actions";
import { fetchLocations } from "./actions";
import GaugeChart from "../ui/components/GaugeChart";
import BarChart from "../ui/components/BarChart";

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

  console.log(locations);
  return (
    <div>
      <ChartCard>
        <GaugeChart endpoint="locations" />
      </ChartCard>

      <ChartCard>
        <BarChart endpoint="locations" />
      </ChartCard>
      <button onClick={() => logout()}>Sair da conta</button>
    </div>
  );
};

export default Page;
