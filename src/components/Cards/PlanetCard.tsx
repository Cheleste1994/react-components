import React from 'react';
import { ApiResponse, AppProps, Planet } from '../../types/interface';
import LogoLoad from '../LogoLoad/LogoLoad';
import styles from '../../routes/HomePage/Home.module.scss';
import { useNavigate, useLocation, useParams, Outlet } from 'react-router-dom';

export default function PlanetCard({ dataSearch }: AppProps) {
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
        {(dataSearch?.dataResponse as ApiResponse<Planet>)?.results?.map(
          (el, index) => (
            <div
              key={`${new Date().getTime()}${index}${Math.random()}`}
              className={dataSearch?.isLoading ? styles.loading : ''}
              onClick={() => handleCLick(el.url)}
            >
              <h3>{el.name}</h3>
              <span>Diameter: {el.diameter}</span>
              <span>Gravity: {el.gravity}</span>
              <span>
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
      <Outlet />
    </>
  );
}
