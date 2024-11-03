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
}

export type User = {
  id: string;
  name: string;
  email: string;
};
