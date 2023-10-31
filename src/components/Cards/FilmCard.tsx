import React from 'react';
import { ApiResponse, AppProps, Film } from '../../types/interface';
import LogoLoad from '../LogoLoad/LogoLoad';
import styles from '../Main/main.module.scss';

export default function FilmCard({ dataSearch }: AppProps) {
  return (
    <div>
      {(dataSearch?.dataResponse as ApiResponse<Film>)?.results?.map(
        (el, index) => (
          <div
            key={`${new Date().getTime()}${index}${Math.random()}`}
            className={dataSearch?.isLoading ? styles.loading : ''}
          >
            <h3>{el.title}</h3>
            <span>Director: {el.director}</span>
            <span>Producer: {el.producer}</span>
            <span className={styles.films}>
              Planet resource URLs that are in this film:
              <div>
                {el.planets?.map((planet, index) => (
                  <div key={`planet-${index}`}>
                    Planet {index + 1}: <a href={planet}>Link</a>
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
