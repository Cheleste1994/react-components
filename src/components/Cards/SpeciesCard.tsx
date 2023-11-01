import React from 'react';
import { ApiResponse, AppProps, Species } from '../../types/interface';
import LogoLoad from '../LogoLoad/LogoLoad';
import styles from '../../routes/HomePage/Home.module.scss';

export default function SpeciesCard({ dataSearch }: AppProps) {
  return (
    <div>
      {(dataSearch?.dataResponse as ApiResponse<Species>)?.results?.map(
        (el, index) => (
          <div
            key={`${new Date().getTime()}${index}${Math.random()}`}
            className={dataSearch?.isLoading ? styles.loading : ''}
          >
            <h3>{el.name}</h3>
            <span>Classification: {el.classification}</span>
            <span>Designation: {el.designation}</span>
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
        )
      ) || <LogoLoad />}
    </div>
  );
}
