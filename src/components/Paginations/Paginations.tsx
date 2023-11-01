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

  const [, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams(linkPage);
  }, [linkPage, setSearchParams]);

  const handleButtonCliCk = (value: string) => {
    handlePaginations?.(value);
    const url = new URL(value);
    const searchParams = url.search;
    setLinkPage(searchParams);
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
