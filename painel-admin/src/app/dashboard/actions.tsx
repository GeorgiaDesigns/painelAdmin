import { notFound } from "next/navigation";
import { Character } from "../lib/definitions";

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
