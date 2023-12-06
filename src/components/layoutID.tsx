import { Provider } from 'react-redux';
import Header from './Header/Header';
import { store } from '../redux/store';
import { ReactElement } from 'react';
import ProductsList from './ProductsList/ProductsList';
import styles from '../pages/Home.module.scss';

export default function LayoutID({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Provider store={store}>
        <Header {...(children as ReactElement)?.props} />
        <div className={`${styles.cards} cards`}>
          <ProductsList
            dataResponse={
              (children as ReactElement)?.props.initialState.productSlice
                .dataSearch.dataResponse
            }
          />
          {children}
        </div>
      </Provider>
    </>
  );
}
