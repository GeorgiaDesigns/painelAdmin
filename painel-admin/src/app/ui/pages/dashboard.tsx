import React, { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { useSession } from "next-auth/react";


export const getCharactersFrom = async (location: string) => {
  const res = await fetch(
    `https://rickandmortyapi.com/api/character/?location=${location}`
  );
  const data: Character = await res.json();

  if (!data) notFound();
  return data;
};

export const getCharactersAlive = async () => {
  const res = await fetch(
    `https://rickandmortyapi.com/api/character/?status=alive`
  );
  const data: Character = await res.json();

  if (!data) notFound();
  return data;
};

export const getAllLocations = async () => {
  const res = await fetch("https://rickandmortyapi.com/api/location/");
  const data: Location[] = await res.json();

  if (!data) notFound();
  return data;
};

const Dashboard = () => {
  const [filteredCharacters, setFilteredCharacters] = useState([]);
const [locations, setLocations] = useState([])
  const handleShowLocation = async (location: string) => {
    const characters = await getCharactersFrom(location);
    setFilteredCharacters(characters);
    return;
  };

  useEffect = {
  const data: Location[] = await getAllLocations();
  setLocations(data)


  }[]
  return (
    <div>
      <Dropdown>
        {/* <Dropdown.Toggle variant="success" id="dropdown-basic"></Dropdown.Toggle> */}
        {locations.map((l: Location) => (
          <li key={l.id} onClick={handleShowLocation}>
            {l.name}
          </li>
        ))}

        {filteredCharacters}
      </Dropdown>
    </div>
  );
};

export default Dashboard;
