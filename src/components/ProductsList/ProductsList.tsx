import { useRouter } from 'next/router';
import { ProductList } from '../../types/interface';
import LogoLoad from '../LogoLoad/LogoLoad';
import styles from './ProductsList.module.scss';

export default function ProductsList({
  dataResponse,
}: {
  dataResponse: ProductList | null;
}): JSX.Element {
  const router = useRouter();

  return (
    <>
      <div data-testid="products-list">
        {dataResponse?.products?.map((el, index) => (
          <div
            key={`${new Date().getTime()}${index}${Math.random()}`}
            data-testid="card-product"
            onClick={() => router.push(`/${el.id}`)}
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
        )) || <LogoLoad />}
      </div>
    </>
  );
}
