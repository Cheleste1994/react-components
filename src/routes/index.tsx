import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import IdCard from '../components/Cards/idCard/IdCard';
import LogoLoad from '../components/LogoLoad/LogoLoad';
import PageError from './404/PageError';

const Home = lazy(() => import('./HomePage/HomePage'));

const Router = (): React.JSX.Element => (
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
    <Route path="*" element={<PageError />} />
  </Routes>
);

export default Router;
