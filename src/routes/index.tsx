import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import LogoLoad from '../components/LogoLoad/LogoLoad';
import PageError from './404';

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
    />
    <Route path="*" element={<PageError />} />
    <Route path=":id" element={<IdCard />} />
  </Routes>
);

export default Router;
