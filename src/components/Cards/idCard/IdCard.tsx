import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import makeRequest from '../../../api/data-service';
import { IdResponseState, Product } from '../../../types/interface';
import LogoLoad from '../../LogoLoad/LogoLoad';
import styles from './idCard.module.scss';

const baseUrl = 'https://dummyjson.com/products';

export default function IdCard() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [dataIdCard, setDataIdCard] = useState<IdResponseState>({
    isLoading: false,
    dataId: null,
  });

  const fetchDataWithId = useCallback(() => {
    if (!dataIdCard.dataId) {
      setDataIdCard({ dataId: null, isLoading: true });
      makeRequest('GET', baseUrl + pathname).then(({ data }) => {
        if (data) {
          setDataIdCard({
            dataId: data as Product,
            isLoading: false,
          });
        }
      });
    }
  }, [dataIdCard.dataId, pathname]);

  useEffect(() => {
    fetchDataWithId();
  }, [fetchDataWithId]);

  const handleClickPrev = () => {
    navigate(`/`);
  };

  return (
    <div className={styles.card} data-testid="card-details">
      {dataIdCard?.isLoading ? (
        <LogoLoad />
      ) : (
        <div>
          <span className={styles.prev} onClick={handleClickPrev}>
            ←
          </span>
          <h2>{dataIdCard.dataId?.title}</h2>
          <h3>{dataIdCard.dataId?.brand}</h3>
          <span>{dataIdCard.dataId?.category}</span>
          <span>{dataIdCard.dataId?.description}</span>
          <span>{dataIdCard.dataId?.price}$</span>
        </div>
      )}
    </div>
  );
}
