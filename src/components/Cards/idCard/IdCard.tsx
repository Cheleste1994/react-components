import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetProductDetailQuery } from '../../../redux/api/productsApi';
import { useAppDispatch } from '../../../redux/hooks/hooks';
import {
  clearProductId,
  setProductId,
} from '../../../redux/slice/detail.slice';
import LogoLoad from '../../LogoLoad/LogoLoad';
import styles from './idCard.module.scss';

export default function IdCard(): JSX.Element {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: dataId,
    isLoading,
    isError,
  } = useGetProductDetailQuery(id as string, {
    skip: !id,
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setProductId({ dataId, isLoading, isOpen: true }));
  }, [dataId, dispatch, isLoading]);

  const handleClickPrev = (): void => {
    navigate(`/`);
    dispatch(clearProductId());
  };

  return (
    <div className={styles.card}>
      {isError && <div>Not found!</div>}
      {isLoading ? (
        <LogoLoad />
      ) : (
        <div data-testid="card-details">
          <span
            className={styles.prev}
            onClick={handleClickPrev}
            data-testid="closed-details"
          >
            ←
          </span>
          <h2>{dataId?.title}</h2>
          <h3>{dataId?.brand}</h3>
          <span>{dataId?.category}</span>
          <span>{dataId?.description}</span>
          <span>{dataId?.price}$</span>
        </div>
      )}
    </div>
  );
}
