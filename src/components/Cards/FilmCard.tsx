import React from 'react';
import { ApiResponse, AppProps, Film } from '../../types/interface';
import LogoLoad from '../LogoLoad/LogoLoad';
import styles from '../../routes/HomePage/Home.module.scss';
import { useNavigate, useLocation, useParams, Outlet } from 'react-router-dom';

export default function FilmCard({ dataSearch }: AppProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { id } = useParams();

  const handleCLick = (url: string) => {
    if (id) {
      navigate(`/${pathname.split('/')[1]}`);
      return;
    }
    navigate(url.split('/').slice(-2).join(''));
  };

  const handleCliCkClosed = () => {
    if (id) {
      navigate(`/${pathname.split('/')[1]}`);
    }
  };
  return (
    <>
      <div onClick={handleCliCkClosed}>
        {(dataSearch?.dataResponse as ApiResponse<Film>)?.results?.map(
          (el, index) => (
            <div
              key={`${new Date().getTime()}${index}${Math.random()}`}
              className={dataSearch?.isLoading ? styles.loading : ''}
              onClick={() => handleCLick(el.url)}
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
      <Outlet />
    </>
  );
}
