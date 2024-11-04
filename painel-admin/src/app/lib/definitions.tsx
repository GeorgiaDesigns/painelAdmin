// Dados exibidos da API do rick and morty -> https://rickandmortyapi.com/documentation/

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  location: {
    name: string;
    url: string;
  };
}

export interface Location {
  id: string;
  name: string;
  url: string;
  created: string;
  residents: Character[];
}

export interface Episode {
  id: string;
  name: string;
  air_date: Date;
  episode: string;
  characters: string[];
}

export type User = {
  id: string;
  name: string;
  email: string;
};

export interface DashboardFilterProps {
  location: string;
}

export interface Response {
  info: { count: number; pages: number };
  results: Location[] | Character[] | Episode[];
}
