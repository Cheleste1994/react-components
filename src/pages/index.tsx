import { InferGetServerSidePropsType } from 'next';
import { ReactElement } from 'react';
import Layout from '../components/layout';
import LimitProducts from '../components/LimitProducts/LimitProducts';
import Paginations from '../components/Paginations/Paginations';
import ProductsList from '../components/ProductsList/ProductsList';
import { getProducts } from '../redux/api/productsApi';
import { clearProductId } from '../redux/slice/detail.slice';
import { setDataSearch } from '../redux/slice/products.slice';
import { wrapper } from '../redux/store';
import styles from './Home.module.scss';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { search, limit, skip } = context.query;
    const { data, isLoading } = await store.dispatch(
      getProducts.initiate(
        search
          ? `search?q=${search}`
          : `?limit=${limit || 10}&skip=${skip || 0}`
      )
    );
    store.dispatch(setDataSearch({ productList: data || null, isLoading }));
    store.dispatch(clearProductId());

    return { props: { products: store.getState().productSlice.dataSearch } };
  }
);

function HomePage({
  products,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const { dataResponse: productList } = products;

  return (
    <>
      <main className={styles.main} data-testid="page-home">
        <>
          <LimitProducts />
          <div className={`${styles.cards} cards`}>
            <ProductsList dataResponse={productList} />
          </div>
          {!productList ||
          productList?.total <= productList?.products?.length ? (
            ''
          ) : (
            <Paginations />
          )}
        </>
      </main>
    </>
  );
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default HomePage;
