import React from 'react';
import { AppProps, ProductList } from '../../types/interface';
import LogoLoad from '../LogoLoad/LogoLoad';
import styles from '../../routes/HomePage/Home.module.scss';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

export default function ProductsCard({ dataSearch }: AppProps) {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleCLick = (url: string) => {
    if (id) {
      navigate(`/`);
      return;
    }
    navigate(`/${url}`);
  };

  const handleCliCkClosed = () => {
    if (id) {
      navigate('/');
    }
  };
  return (
    <>
      <div onClick={handleCliCkClosed}>
        {(dataSearch?.dataResponse as ProductList)?.products?.map(
          (el, index) => (
            <div
              key={`${new Date().getTime()}${index}${Math.random()}`}
              className={dataSearch?.isLoading ? styles.loading : ''}
              onClick={() => handleCLick(`${el.id}`)}
            >
              <h3>{el.title}</h3>
              <h4>{el.brand}</h4>
              <span className={styles.films}>
                Film resource URLs that this person has been in:
                <div>
                  {el.images?.map((images, index) => (
                    <div key={`images-${index}`}>
                      Images {index + 1}: <a href={images}>Link</a>
                    </div>
                  ))}
                </div>
              </span>
              <span>{el.category}</span>
            </div>
          )
        ) || <LogoLoad />}
      </div>
      <Outlet />
    </>
  );
}