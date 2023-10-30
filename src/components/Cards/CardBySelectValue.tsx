import React from 'react';
import { AppProps } from '../../types/interface';
import FilmCard from './FilmCard';
import PeopleCard from './PeopleCard';
import PlanetCard from './PlanetCard';
import SpeciesCard from './SpeciesCard';
import StarshipCard from './StarshipCard';
import VehicleCard from './VehicleCard';

export default function CardBySelectValue({
  selectValue,
  dataResponse,
  isLoading,
}: AppProps) {
  switch (selectValue) {
    case 'people':
      return (
        <PeopleCard
          dataRoot={null}
          dataResponse={dataResponse}
          isLoading={isLoading}
        />
      );
    case 'films':
      return (
        <FilmCard
          dataRoot={null}
          dataResponse={dataResponse}
          isLoading={isLoading}
        />
      );
    case 'starships':
      return (
        <StarshipCard
          dataRoot={null}
          dataResponse={dataResponse}
          isLoading={isLoading}
        />
      );
    case 'vehicles':
      return (
        <VehicleCard
          dataRoot={null}
          dataResponse={dataResponse}
          isLoading={isLoading}
        />
      );
    case 'species':
      return (
        <SpeciesCard
          dataRoot={null}
          dataResponse={dataResponse}
          isLoading={isLoading}
        />
      );
    case 'planets':
      return (
        <PlanetCard
          dataRoot={null}
          dataResponse={dataResponse}
          isLoading={isLoading}
        />
      );
    default:
      return null;
  }
}
