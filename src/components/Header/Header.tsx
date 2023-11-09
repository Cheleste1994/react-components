import React, { useContext, useState } from 'react';
import styles from './Header.module.scss';
import svg from '../../assets/search.svg';
import { useSearchParams } from 'react-router-dom';
import { Context } from '../Context/Context';

export default function Header() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [inputValue, setInputValue] = useState(
    searchParams.get('search') || localStorage.getItem('inputValue') || ''
  );

  const { dataSearch } = useContext(Context);

  const handleSearchClick = (event?: React.KeyboardEvent<HTMLInputElement>) => {
    if (!event || event?.code === 'Enter') {
      const params = new URLSearchParams();
      params.set('search', inputValue);
      localStorage.setItem('inputValue', inputValue || '');
      setSearchParams(params);
    }
  };

  return (
    <header className={styles.header}>
      <div>React. Components</div>
      <div>
        <img src={svg} alt="search" onClick={() => handleSearchClick()} />
        <input
          list="starWars"
          placeholder={dataSearch?.isLoading ? 'Loading...' : ''}
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          disabled={!!dataSearch?.isLoading}
          onKeyDown={handleSearchClick}
        />
      </div>
    </header>
  );
}
