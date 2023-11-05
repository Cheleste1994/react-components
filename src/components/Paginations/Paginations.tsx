import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { AppProps } from '../../types/interface';
import styles from './Paginations.module.scss';

export default function Paginations({ dataSearch }: AppProps) {
  const [searchParams, setSearchParams] = useSearchParams();
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
      <button
        onClick={() => handleClickBtn('next')}
        disabled={skip >= Number(dataSearch?.dataResponse?.total)}
      >
        Next
      </button>
    </div>
  );
}
