import React from 'react';
import Paginations from '../../components/Paginations/Paginations';
import { AppProps } from '../../types/interface';
import styles from './Home.module.scss';

export default function HomePage({ dataSearch, handlePaginations }: AppProps) {
  return (
    <main className={styles.main}>
      <>
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
