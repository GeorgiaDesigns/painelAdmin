"use server";
import { notFound } from "next/navigation";
import { Character } from "../lib/definitions";
import { Location } from "../lib/definitions";
import { getRandomRGBA } from "../lib/utils";

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

export const fetchLocations = async () => {
  const res = await fetch(
    "https://rickandmortyapi.com/api/location/?dimension=Dimension C-137"
  );
  const data = await res.json();

  if (!data) notFound();
  return data.results.map((item: Location) => ({
    id: item.id,
    label: item.name,
    value: item.residents.length,
    color: getRandomRGBA(),
  }));
};
