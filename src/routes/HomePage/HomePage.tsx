import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useGetProductsQuery } from '../../redux/api/productsApi';
import ProductsCard from '../../components/Cards/ProductsCard';
import Paginations from '../../components/Paginations/Paginations';
import { useAppDispatch } from '../../redux/hooks/hooks';
import { setDataSearch } from '../../redux/slice/products.slice';
import styles from './Home.module.scss';

export default function HomePage(): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectValue, setSelectValue] = useState('');

  const { data: productList, isLoading } = useGetProductsQuery(
    searchParams.get('search')
      ? `search?q=${searchParams.get('search')}`
      : `?${searchParams}`
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setDataSearch({ productList, isLoading }));
  }, [dispatch, isLoading, productList]);

  const handleSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setSearchParams(`limit=${event.target.value}&page=1&skip=0`);
    setSelectValue(event.target.value);
  };
  return (
    <>
      <main className={styles.main} data-testid="page-home">
        <>
          {isLoading ? (
            ''
          ) : (
            <div className={styles.count}>
              <select
                name="products"
                onChange={handleSelectChange}
                value={selectValue}
                data-testid="limit-products"
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
            <ProductsCard />
          </div>
          {!productList ||
          productList?.total <= productList?.products?.length ? (
            ''
          ) : (
            <Paginations />
          )}
        </>
      </main>
    </>
  );
}
