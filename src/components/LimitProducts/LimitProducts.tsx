import { useRouter } from 'next/router';
import styles from './LimitProducts.module.scss';

export default function LimitProducts() {
  const router = useRouter();

  const { limit } = router.query;

  const handleSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    router.push(`?limit=${event.target.value}&page=1&skip=0`);
  };

  return (
    <div className={styles.count}>
      <select
        name="products"
        data-testid="limit-products"
        onChange={handleSelectChange}
      >
        <option value="" disabled>
          {limit}
        </option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
      </select>
    </div>
  );
}
