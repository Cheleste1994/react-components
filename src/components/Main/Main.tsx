import React from 'react';
import { AppProps } from '../../types/interface';
import CardBySelectValue from '../Cards/CardBySelectValue';
import Paginations from '../Paginations/Paginations';
import styles from './Main.module.scss';

export default function Main({
  selectValue,
  dataSearch,
  handlePaginations,
}: AppProps) {
  return (
    <main className={styles.main}>
      <>
        <CardBySelectValue selectValue={selectValue} dataSearch={dataSearch} />
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
