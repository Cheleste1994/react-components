import React, { useState } from 'react';
import styles from './Header.module.scss';
import svg from '../../assets/search.svg';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../redux/hooks/hooks';
import { setSearchValue } from '../../redux/slice/products.slice';

export default function Header(): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const { searchValue, dataSearch } = useAppSelector((st) => st.productSlice);
  const { isOpen } = useAppSelector((state) => state.detailSlice);
  const [inputValue, setInputValue] = useState(
    searchParams.get('search') || searchValue
  );

  const dispatch = useAppDispatch();

  const handleSearchClick = (
    event?: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (!event || event?.code === 'Enter') {
      const params = new URLSearchParams();
      params.set('search', inputValue);
      localStorage.setItem('inputValue', inputValue || '');
      setSearchParams(params);
      dispatch(setSearchValue({ inputValue }));
    }
  };

  return (
    <header className={styles.header}>
      <div>React. Components</div>
      <div>
        <img
          src={svg}
          alt="search"
          onClick={() => !isOpen && handleSearchClick()}
          data-testid="btn-search"
          style={{ opacity: `${isOpen ? '0.5' : '1'}` }}
        />
        <input
          list="starWars"
          placeholder={dataSearch?.isLoading ? 'Loading...' : ''}
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          disabled={!!dataSearch?.isLoading || isOpen}
          onKeyDown={handleSearchClick}
          data-testid="input-search"
          style={{ opacity: `${isOpen ? '0.5' : '1'}` }}
        />
      </div>
    </header>
  );
}
