import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import { setPage } from '../../redux/slice/products.slice';
import styles from './Paginations.module.scss';

export default function Paginations(): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();

  const { dataSearch, page: pageNumber } = useAppSelector(
    (state) => state.productSlice
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setPage(Number(searchParams.get('page'))));
  }, [dispatch, searchParams]);

  const limit = Number(searchParams.get('limit')) || 10;
  const skip = Number(searchParams.get('skip')) || 0;

  const handleClickBtn = (value: string): void => {
    const params = new URLSearchParams(searchParams);

    if (value === 'prev') {
      params.set('skip', `${Math.max(skip - limit, 0)}`);
    } else {
      params.set('skip', `${skip + limit}`);
    }
    const currentPage = Math.floor(Number(params.get('skip')) / limit) + 1;

    params.set('page', `${currentPage}`);
    params.set('limit', `${limit}`);
    setSearchParams(params);
  };

  return (
    <div className={`paginations ${styles.paginations}`}>
      <button
        onClick={() => handleClickBtn('prev')}
        disabled={skip === 0}
        data-testid="prev-page"
      >
        Prev
      </button>
      <span data-testid="page-display">{pageNumber}</span>
      <button
        onClick={() => handleClickBtn('next')}
        disabled={skip >= Number(dataSearch?.dataResponse?.total)}
        data-testid="next-page"
      >
        Next
      </button>
    </div>
  );
}
