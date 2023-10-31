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
  dataSearch,
}: AppProps) {
  switch (selectValue) {
    case 'people':
      return <PeopleCard dataSearch={dataSearch} />;
    case 'films':
      return <FilmCard dataSearch={dataSearch} />;
    case 'starships':
      return <StarshipCard dataSearch={dataSearch} />;
    case 'vehicles':
      return <VehicleCard dataSearch={dataSearch} />;
    case 'species':
      return <SpeciesCard dataSearch={dataSearch} />;
    case 'planets':
      return <PlanetCard dataSearch={dataSearch} />;
    default:
      return null;
  }
}
