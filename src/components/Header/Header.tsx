import React, { useEffect, useState } from 'react';
import { AppProps, AppState } from '../../types/interface';
import styles from './Header.module.scss';
import svg from '../../assets/search.svg';
import { useSearchParams } from 'react-router-dom';

export default function Header({
  dataRoot,
  selectValue,
  updateInputValue,
  updateSelectValue,
}: AppProps) {
  const [state, setState] = useState<AppState>({
    dataRoot: null,
    isLoading: true,
  });

  const [inputValue, setInputValue] = useState(
    localStorage.getItem('inputValue') || ''
  );

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (inputValue) {
      params.set('search', inputValue);
      setSearchParams(params);
    } else {
      params.set('search', inputValue);
      setSearchParams(params);
    }
  }, [inputValue, searchParams, setSearchParams]);

  useEffect(() => {
    setState({
      dataRoot,
      isLoading: false,
    });
  }, [dataRoot]);

  let valueOption: string[] | [] = [];

  if (state.dataRoot) {
    valueOption = Object.keys(state.dataRoot);
  }

  const handleSearchClick = (event?: React.KeyboardEvent<HTMLInputElement>) => {
    if (!event || event?.code === 'Enter') {
      if (selectValue) {
        updateInputValue?.(inputValue?.trim() || '');
      }
    }
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    updateSelectValue?.(event.target.value);
    setInputValue('');
  };

  return (
    <header className={styles.header}>
      <div>React. Components</div>
      <div>
        <img src={svg} alt="search" onClick={() => handleSearchClick()} />
        <select value={selectValue} onChange={handleSelectChange}>
          <option disabled={!!selectValue}>
            {state.isLoading ? 'Loading...' : 'Section'}
          </option>
          {valueOption.map((value, index) => (
            <option key={value + index}>{value}</option>
          ))}
        </select>
        <input
          list="starWars"
          placeholder={
            state.isLoading ? 'Loading...' : selectValue ? '' : 'Select section'
          }
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          disabled={!dataRoot}
          onKeyDown={handleSearchClick}
        />
      </div>
    </header>
  );
}
