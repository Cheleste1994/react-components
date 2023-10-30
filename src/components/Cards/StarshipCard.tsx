import React from 'react';
import { ApiResponse, AppProps, Starship } from '../../types/interface';
import LogoLoad from '../LogoLoad/LogoLoad';
import styles from '../Main/main.module.scss';

export default function StarshipCard({ isLoading, dataResponse }: AppProps) {
  return (
    <div className={isLoading ? styles.loading : ''}>
      {(dataResponse as ApiResponse<Starship>)?.results?.map((el, index) => (
        <div key={`${new Date().getTime()}${index}${Math.random()}`}>
          <h3>{el.name}</h3>
          <span>Model: {el.model}</span>
          <span>Manufacturer: {el.manufacturer}</span>
          <span className={styles.films}>
            Film URL Resources that this starship has appeared in:
            <div>
              {el.films?.map((film, index) => (
                <div key={`film-${index}`}>
                  Film {index + 1}: <a href={film}>Link</a>
                </div>
              ))}
            </div>
          </span>
          <span>{el.created}</span>
        </div>
      )) || <LogoLoad />}
    </div>
  );
}
