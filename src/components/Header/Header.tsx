import styles from './Header.module.scss';
import svg from '../../assets/search.svg';

import { RootState } from '../../redux/store';
import { useRouter } from 'next/router';
import { FormEvent } from 'react';

export default function Header({
  initialState,
}: {
  initialState: RootState;
}): JSX.Element {
  const { dataSearch } = initialState.productSlice;
  const { isOpen } = initialState.detailSlice;
  const router = useRouter();

  const handleForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    router.push(`/?search=${formData.get('search')}`);
  };

  return (
    <header className={styles.header}>
      <div>React. Components</div>
      <form onSubmit={handleForm}>
        <button type="submit">
          <img
            src={svg.src}
            alt="search"
            data-testid="btn-search"
            style={{ opacity: `${isOpen ? '0.5' : '1'}` }}
          />
        </button>
        <input
          list="starWars"
          placeholder={dataSearch?.isLoading ? 'Loading...' : ''}
          disabled={!!dataSearch?.isLoading || isOpen}
          name="search"
          data-testid="input-search"
          style={{ opacity: `${isOpen ? '0.5' : '1'}` }}
        />
      </form>
    </header>
  );
}
