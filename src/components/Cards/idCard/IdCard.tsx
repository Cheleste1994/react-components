import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  AppProps,
  Film,
  People,
  Planet,
  Species,
  Starship,
  Vehicle,
} from '../../../types/interface';
import LogoLoad from '../../LogoLoad/LogoLoad';
import styles from './idCard.module.scss';

export default function IdCard({ dataIdCard }: AppProps) {
  const [dataId, setDataId] = useState<
    People | Film | Starship | Vehicle | Species | Planet
  >();

  const params = useParams();

  console.log(params);

  useEffect(() => {
    if (dataIdCard?.dataId) {
      setDataId(dataIdCard.dataId);
    }
  }, [dataIdCard]);

  return (
    <div className={styles.card}>
      {dataIdCard?.isLoading ? (
        <LogoLoad />
      ) : (
        <div>
          <h3>{dataId?.created}</h3>
          <span>
            Film resource URLs that this person has been in:
            <div></div>
          </span>
          <span>{dataId?.created}</span>
        </div>
      )}
    </div>
  );
}
