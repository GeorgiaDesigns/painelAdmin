"use server";
import { notFound } from "next/navigation";
import { Character, Episode } from "../lib/definitions";
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

export const fetchCharactersByStatus = async () => {
  const alive = await fetch(
    "https://rickandmortyapi.com/api/character/?status=alive"
  );
  const dead = await fetch(
    "https://rickandmortyapi.com/api/character/?status=dead"
  );

  const data1 = await alive.json();
  const data2 = await dead.json();

  if (!data1 || !data2) notFound();
  return [
    {
      status: "vivos",
      Vivos: data1.info.count,
    },
    {
      status: "mortos",
      Mortos: data2.info.count,
    },
  ];
};

export const fetchCharactersPerEpisode = async () => {
  const res = await fetch("https://rickandmortyapi.com/api/episode");

  const data = await res.json();

  if (!data) notFound();
  return [
    {
      id: "Episódios",
      data: data.results.map((item: Episode) => ({
        x: item.episode,
        y: item.characters.length,
      })),
    },
  ];
};
