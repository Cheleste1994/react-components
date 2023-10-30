import React, { useEffect, useState } from 'react';
import { AppProps, AppState } from '../../types/interface';
import styles from './Header.module.scss';
import svg from '../../assets/search.svg';

export default function Header({
  dataRoot,
  selectValue,
  isLoading,
  updateInputValue,
  updateSelectValue,
}: AppProps) {
  const [state, setState] = useState<AppState>({
    dataRoot: null,
    isLoading: true,
    selectValue: '',
  });

  const [inputValue, setInputValue] = useState(
    localStorage.getItem('inputValue') || ''
  );

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
    setState({ ...state, selectValue: event.target.value });
    updateSelectValue?.(event.target.value);
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
          disabled={isLoading}
          onKeyDown={handleSearchClick}
        />
      </div>
    </header>
  );
}
