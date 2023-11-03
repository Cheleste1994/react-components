import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  ApiResponse,
  Film,
  People,
  Planet,
  Species,
  Starship,
  Vehicle,
} from '../../types/interface';
import styles from './Paginations.module.scss';

export default function Paginations({
  handlePaginations,
  dataResponse,
}: {
  handlePaginations?: (value: string) => void;
  dataResponse?: ApiResponse<
    People | Film | Starship | Vehicle | Species | Planet
  >;
}) {
  const [linkPage, setLinkPage] = useState('');

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const pageNumber = new URLSearchParams(linkPage).get('page');
    const params = new URLSearchParams(searchParams);

    if (pageNumber) {
      params.set('page', pageNumber);
    }
    setSearchParams(params);
  }, [linkPage, searchParams, setSearchParams]);

  const handleButtonCliCk = (value: string) => {
    handlePaginations?.(value);
    setLinkPage(value);
  };

  return (
    <div className={`paginations ${styles.paginations}`}>
      <button
        onClick={() => handleButtonCliCk(dataResponse?.previous || '')}
        disabled={!dataResponse?.previous}
      >
        Prev
      </button>
      <button
        onClick={() => handleButtonCliCk(dataResponse?.next || '')}
        disabled={!dataResponse?.next}
      >
        Next
      </button>
    </div>
  );
}
