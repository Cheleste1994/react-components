import React from 'react';
import LogoLoad from '../components/LogoLoad/LogoLoad';
import mainStyles from '../routes/HomePage/Home.module.scss';

export default function PageError() {
  return (
    <>
      <main className={mainStyles.main}>
        <LogoLoad />
        <div>
          <span>Page not found!</span>
        </div>
      </main>
    </>
  );
}
