import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import IdCard from '../components/Cards/idCard/IdCard';
import LogoLoad from '../components/LogoLoad/LogoLoad';
import { AppProps } from '../types/interface';

const Home = lazy(() => import('./HomePage/HomePage'));

const Router = ({ dataSearch, selectValue, handlePaginations }: AppProps) => (
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
      <Route path=":id" element={<IdCard />} />
    </Route>
  </Routes>
);

export default Router;
