import React, { lazy, Suspense } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import FilmCard from '../components/Cards/FilmCard';
import PeopleCard from '../components/Cards/PeopleCard';
import PlanetCard from '../components/Cards/PlanetCard';
import SpeciesCard from '../components/Cards/SpeciesCard';
import StarshipCard from '../components/Cards/StarshipCard';
import VehicleCard from '../components/Cards/VehicleCard';
import LogoLoad from '../components/LogoLoad/LogoLoad';
import { AppProps } from '../types/interface';

const Home = lazy(() => import('./HomePage/HomePage'));

const Router = ({ dataSearch, selectValue, handlePaginations }: AppProps) => (
  <Routes>
    <Route
      path=""
      element={
        <Suspense fallback={<LogoLoad />}>
          <Outlet />
        </Suspense>
      }
    >
      <Route
        path=""
        element={
          <Home
            dataSearch={dataSearch}
            selectValue={selectValue}
            handlePaginations={handlePaginations}
          />
        }
      >
        <Route
          path="/people"
          element={<PeopleCard dataSearch={dataSearch} />}
        />
        <Route path="/films" element={<FilmCard dataSearch={dataSearch} />} />
        <Route
          path="/starships"
          element={<StarshipCard dataSearch={dataSearch} />}
        />
        <Route
          path="/vehicles"
          element={<VehicleCard dataSearch={dataSearch} />}
        />
        <Route
          path="/species"
          element={<SpeciesCard dataSearch={dataSearch} />}
        />
        <Route
          path="/planets"
          element={<PlanetCard dataSearch={dataSearch} />}
        />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Route>
    </Route>
  </Routes>
);

export default Router;
