import React from 'react';
import { ApiResponse, AppProps, People } from '../../types/interface';
import LogoLoad from '../LogoLoad/LogoLoad';
import styles from '../../routes/HomePage/Home.module.scss';
import { Outlet } from 'react-router-dom';

export default function PeopleCard({ dataSearch, updateUrlIdCard }: AppProps) {
  return (
    <>
      <div>
        {(dataSearch?.dataResponse as ApiResponse<People>)?.results?.map(
          (el, index) => (
            <div
              key={`${new Date().getTime()}${index}${Math.random()}`}
              className={dataSearch?.isLoading ? styles.loading : ''}
              onClick={() => updateUrlIdCard?.(el.url)}
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
          )
        ) || <LogoLoad />}
      </div>
      <Outlet />
    </>
  );
}
