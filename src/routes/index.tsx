import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import LogoLoad from '../components/LogoLoad/LogoLoad';

const Home = lazy(() => import('./HomePage/HomePage'));
const IdCard = lazy(() => import('../components/Cards/idCard/IdCard'));

const Router = () => (
  <Routes>
    <Route
      path=""
      element={
        <Suspense fallback={<LogoLoad />}>
          <Home />
        </Suspense>
      }
    >
      <Route path=":id" element={<IdCard />} />
    </Route>
  </Routes>
);

export default Router;
