"use client";
import React, { useEffect, useState } from "react";
import ChartCard from "../ui/components/ChartCard";
import { logout } from "../login/actions";
import CalendarChart from "../ui/components/CalendarChart";

const Page = () => {
  //   const [filteredCharacters, setFilteredCharacters] = useState([]);
  // const [locations, setLocations] = useState([])
  //   const handleShowLocation = async (location: string) => {
  //     const characters = await getCharactersFrom(location);
  //     setFilteredCharacters(characters);
  //     return;
  //   };

  //   useEffect = {
  //   const data: Location[] = await getAllLocations();
  //   setLocations(data)
  //}[]
  return (
    <div>
      <ChartCard>
        <CalendarChart />
      </ChartCard>
      <button onClick={() => logout()}>Sair da conta</button>
    </div>
  );
};

export default Page;
