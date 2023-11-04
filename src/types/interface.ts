import { ReactChild } from 'react';

export interface AppProps {
  dataRoot?: RootApi | null;
  dataSearch?: ApiResponseState<
    People | Film | Starship | Vehicle | Species | Planet
  >;
  dataIdCard?: IdResponseState;
  urlIdCard?: string;
  selectValue?: string | undefined;
  updateInputValue?: (value: string) => void;
  updateSelectValue?: (value: string) => void;
  handlePaginations?: (value: string) => void;
  updateUrlIdCard?: (value: string) => void;
}

export interface AppState {
  dataRoot?: null | RootApi;
  isLoading?: boolean;
}

export interface ErrorBoundaryProps {
  children: ReactChild;
}

export interface ErrorBoundaryState {
  error: Error | null;
}

export interface RootApi {
  films: string;
  people: string;
  planets: string;
  species: string;
  starships: string;
  vehicles: string;
}

export interface ApiResponseState<T> {
  isLoading: boolean;
  dataResponse: ApiResponse<T> | null;
}

export interface IdResponseState {
  isLoading: boolean;
  dataId: People | Film | Starship | Vehicle | Species | Planet | null;
}

export interface ApiResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface People {
  birth_year: string;
  eye_color: string;
  films: string[];
  gender: string;
  hair_color: string;
  height: string;
  homeworld: string;
  mass: string;
  name: string;
  skin_color: string;
  created: string;
  edited: string;
  species: string[];
  starships: string[];
  url: string;
  vehicles: string[];
}

export interface Film {
  characters: string[];
  created: string;
  director: string;
  edited: string;
  episode_id: number;
  opening_crawl: string;
  planets: string[];
  producer: string;
  release_date: string;
  species: string[];
  starships: string[];
  title: string;
  url: string;
  vehicles: string[];
}

export interface Starship {
  MGLT: string;
  cargo_capacity: string;
  consumables: string;
  cost_in_credits: string;
  created: string;
  crew: string;
  edited: string;
  hyperdrive_rating: string;
  length: string;
  manufacturer: string;
  max_atmosphering_speed: string;
  model: string;
  name: string;
  passengers: string;
  films: string[];
  pilots: string[];
  starship_class: string;
  url: string;
}

export interface Vehicle {
  cargo_capacity: string;
  consumables: string;
  cost_in_credits: string;
  created: string;
  crew: string;
  edited: string;
  length: string;
  manufacturer: string;
  max_atmosphering_speed: string;
  model: string;
  name: string;
  passengers: string;
  pilots: string[];
  films: string[];
  url: string;
  vehicle_class: string;
}

export interface Species {
  average_height: string;
  average_lifespan: string;
  classification: string;
  created: string;
  designation: string;
  edited: string;
  eye_colors: string;
  hair_colors: string;
  homeworld: string;
  language: string;
  name: string;
  people: string[];
  films: string[];
  skin_colors: string;
  url: string;
}

export interface Planet {
  climate: string;
  created: string;
  diameter: string;
  edited: string;
  films: string[];
  gravity: string;
  name: string;
  orbital_period: string;
  population: string;
  residents: string[];
  rotation_period: string;
  surface_water: string;
  terrain: string;
  url: string;
}
