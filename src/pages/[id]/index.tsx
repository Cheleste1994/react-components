'use client';

import { InferGetServerSidePropsType } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import LayoutID from '../../components/layoutID';
import LogoLoad from '../../components/LogoLoad/LogoLoad';
import { getProductDetail } from '../../redux/api/productsApi';
import { setProductId } from '../../redux/slice/detail.slice';
import { wrapper } from '../../redux/store';
import styles from './idCard.module.scss';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const id = context.params?.id as string;
    const { data, isLoading } = await store.dispatch(
      getProductDetail.initiate(id)
    );

    store.dispatch(
      setProductId({ dataId: data || null, isLoading, isOpen: true })
    );

    return { props: { detailProduct: store.getState().detailSlice } };
  }
);

const IdCard = ({
  detailProduct,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element => {
  const { dataId, isLoading } = detailProduct;
  const router = useRouter();

  return (
    <div className={styles.card}>
      <div className={styles.popup} onClick={() => router.back()} />
      {!dataId && <div>Not found!</div>}
      {isLoading ? (
        <LogoLoad />
      ) : (
        <div className={styles.details} data-testid="card-details">
          <Link className={styles.prev} href={'/'} data-testid="closed-details">
            ←
          </Link>
          <h2>{dataId?.title}</h2>
          <h3>{dataId?.brand}</h3>
          <span>{dataId?.category}</span>
          <span>{dataId?.description}</span>
          <span>{dataId?.price}$</span>
        </div>
      )}
    </div>
  );
};

IdCard.getLayout = function getLayout(page: ReactElement) {
  return <LayoutID>{page}</LayoutID>;
};

export default IdCard;
