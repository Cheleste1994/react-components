import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import FilmCard from '../components/Cards/FilmCard';
import IdCard from '../components/Cards/idCard/IdCard';
import PeopleCard from '../components/Cards/PeopleCard';
import PlanetCard from '../components/Cards/PlanetCard';
import SpeciesCard from '../components/Cards/SpeciesCard';
import StarshipCard from '../components/Cards/StarshipCard';
import VehicleCard from '../components/Cards/VehicleCard';
import LogoLoad from '../components/LogoLoad/LogoLoad';
import { AppProps } from '../types/interface';

const Home = lazy(() => import('./HomePage/HomePage'));

const Router = ({
  dataSearch,
  selectValue,
  dataIdCard,
  handlePaginations,
  updateUrlIdCard,
}: AppProps) => (
  <Routes>
    <Route
      path=""
      element={
        <Suspense fallback={<LogoLoad />}>
          <Home
            dataSearch={dataSearch}
            selectValue={selectValue}
            handlePaginations={handlePaginations}
          />
        </Suspense>
      }
    >
      <Route
        path="/people"
        element={
          <PeopleCard
            dataSearch={dataSearch}
            updateUrlIdCard={updateUrlIdCard}
          />
        }
      >
        <Route path=":id" element={<IdCard dataIdCard={dataIdCard} />} />
      </Route>
      <Route
        path="/films"
        element={
          <FilmCard dataSearch={dataSearch} updateUrlIdCard={updateUrlIdCard} />
        }
      />
      <Route
        path="/starships"
        element={
          <StarshipCard
            dataSearch={dataSearch}
            updateUrlIdCard={updateUrlIdCard}
          />
        }
      />
      <Route
        path="/vehicles"
        element={
          <VehicleCard
            dataSearch={dataSearch}
            updateUrlIdCard={updateUrlIdCard}
          />
        }
      />
      <Route
        path="/species"
        element={
          <SpeciesCard
            dataSearch={dataSearch}
            updateUrlIdCard={updateUrlIdCard}
          />
        }
      />
      <Route
        path="/planets"
        element={
          <PlanetCard
            dataSearch={dataSearch}
            updateUrlIdCard={updateUrlIdCard}
          />
        }
      />
    </Route>
  </Routes>
);

export default Router;
