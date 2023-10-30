import React from 'react';
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
  return (
    <div className={`paginations ${styles.paginations}`}>
      <button
        onClick={() => handlePaginations?.(dataResponse?.previous || '')}
        disabled={!dataResponse?.previous}
      >
        Prev
      </button>
      <button
        onClick={() => handlePaginations?.(dataResponse?.next || '')}
        disabled={!dataResponse?.next}
      >
        Next
      </button>
    </div>
  );
}
