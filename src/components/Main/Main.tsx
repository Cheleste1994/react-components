import React from 'react';
import { AppProps } from '../../types/interface';
import CardBySelectValue from '../Cards/CardBySelectValue';
import Paginations from '../Paginations/Paginations';
import styles from './Main.module.scss';

export default function Main({
  selectValue,
  dataResponse,
  isLoading,
  handlePaginations,
}: AppProps) {
  return (
    <main className={styles.main}>
      <>
        <CardBySelectValue
          dataRoot={null}
          selectValue={selectValue}
          dataResponse={dataResponse}
          isLoading={isLoading}
        />
        {!dataResponse || dataResponse.count <= dataResponse.results.length ? (
          ''
        ) : (
          <Paginations
            handlePaginations={handlePaginations}
            dataResponse={dataResponse}
          />
        )}
      </>
    </main>
  );
}
