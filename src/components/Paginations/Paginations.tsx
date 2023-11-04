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
  dataResponse,
}: {
  dataResponse?: ApiResponse<
    People | Film | Starship | Vehicle | Species | Planet
  >;
}) {
  const [linkPage, setLinkPage] = useState('');

  const [, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (linkPage) {
      const url = new URL(linkPage);
      if (url.search) {
        setSearchParams(url.search);
      }
    }
  }, [linkPage, setSearchParams]);

  const handleButtonCliCk = (value: string) => {
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
