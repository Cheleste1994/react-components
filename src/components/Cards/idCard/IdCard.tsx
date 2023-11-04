import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import makeRequest from '../../../api/data-service';
import {
  Film,
  IdResponseState,
  People,
  Planet,
  Species,
  Starship,
  Vehicle,
} from '../../../types/interface';
import LogoLoad from '../../LogoLoad/LogoLoad';
import styles from './idCard.module.scss';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

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
            dataId: data as
              | People
              | Film
              | Starship
              | Vehicle
              | Species
              | Planet,
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
    navigate(`/${pathname.split('/')[1]}`);
  };

  return (
    <div className={styles.card}>
      {dataIdCard?.isLoading ? (
        <LogoLoad />
      ) : (
        <div>
          <span className={styles.prev} onClick={handleClickPrev}>
            ←
          </span>
          <h2>
            {dataIdCard.dataId && 'title' in dataIdCard.dataId
              ? dataIdCard.dataId.title
              : dataIdCard.dataId?.name}
          </h2>
          <h3>{dataIdCard.dataId?.url}</h3>
          <span>{dataIdCard.dataId?.created}</span>
          <span>{dataIdCard.dataId?.edited}</span>
        </div>
      )}
    </div>
  );
}
