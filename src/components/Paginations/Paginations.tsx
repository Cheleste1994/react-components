import React, { useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Context } from '../Context/Context';
import styles from './Paginations.module.scss';

export default function Paginations() {
  const [searchParams, setSearchParams] = useSearchParams();

  const { dataSearch } = useContext(Context);

  const limit = Number(searchParams.get('limit')) || 10;
  const skip = Number(searchParams.get('skip')) || 0;

  const handleClickBtn = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value === 'prev') {
      params.set('skip', `${Math.max(skip - limit, 0)}`);
    } else {
      params.set('skip', `${skip + limit}`);
    }
    const currentPage = Math.floor(Number(params.get('skip')) / limit) + 1;

    params.set('page', `${currentPage}`);
    setSearchParams(params);
  };

  return (
    <div className={`paginations ${styles.paginations}`}>
      <button onClick={() => handleClickBtn('prev')} disabled={skip === 0}>
        Prev
      </button>
      <span data-testid="page-display">{searchParams.get('page')}</span>
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
