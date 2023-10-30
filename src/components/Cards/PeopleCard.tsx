import React from 'react';
import { ApiResponse, AppProps, People } from '../../types/interface';
import LogoLoad from '../LogoLoad/LogoLoad';
import styles from '../Main/main.module.scss';

export default function PeopleCard({ isLoading, dataResponse }: AppProps) {
  return (
    <div>
      {(dataResponse as ApiResponse<People>)?.results?.map((el, index) => (
        <div
          key={`${new Date().getTime()}${index}${Math.random()}`}
          className={isLoading ? styles.loading : ''}
        >
          <h3>{el.name}</h3>
          <span className={styles.films}>
            Film resource URLs that this person has been in:
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