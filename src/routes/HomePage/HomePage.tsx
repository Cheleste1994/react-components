import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductsCard from '../../components/Cards/ProductsCard';
import Paginations from '../../components/Paginations/Paginations';
import { AppProps } from '../../types/interface';
import styles from './Home.module.scss';

export default function HomePage({ dataSearch }: AppProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectValue, setSelectValue] = useState('');
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams(`limit=${event.target.value}&page=1`);
    setSelectValue(event.target.value);
  };
  return (
    <>
      <main className={styles.main}>
        <>
          {!dataSearch?.dataResponse ? (
            ''
          ) : (
            <div className={styles.count}>
              <select
                name="products"
                onChange={handleSelectChange}
                value={selectValue}
              >
                <option value="" disabled>
                  {searchParams.get('limit')}
                </option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
              </select>
            </div>
          )}
          <div className={`${styles.cards} cards`}>
            <ProductsCard dataSearch={dataSearch} />
          </div>
          {!dataSearch?.dataResponse ||
          dataSearch.dataResponse?.total <=
            dataSearch?.dataResponse?.products?.length ? (
            ''
          ) : (
            <Paginations dataSearch={dataSearch} />
          )}
        </>
      </main>
    </>
  );
}
