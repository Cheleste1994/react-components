import React from 'react';
import { Outlet } from 'react-router';
import Paginations from '../../components/Paginations/Paginations';
import { AppProps } from '../../types/interface';
import styles from './Home.module.scss';

export default function HomePage({ dataSearch, handlePaginations }: AppProps) {
  return (
    <main className={styles.main}>
      <>
        <Outlet />
        {!dataSearch?.dataResponse ||
        dataSearch.dataResponse?.count <=
          dataSearch?.dataResponse?.results?.length ? (
          ''
        ) : (
          <Paginations
            handlePaginations={handlePaginations}
            dataResponse={dataSearch.dataResponse}
          />
        )}
      </>
    </main>
  );
}
