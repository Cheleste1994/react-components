import React, { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './App.scss';
import { Context } from './components/Context/Context';
import ErrorComponent from './components/ErrorComponent';
import Header from './components/Header/Header';
import Router from './routes';

function App(): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState('');

  const [isError, setIsError] = useState<boolean>(false);

  const fetchDataWithSearchAndInput = useCallback((): void => {
    const params = new URLSearchParams(searchParams);
    const searchValue = params.get('search');
    if (searchValue) {
      setSearchValue(searchValue);
    } else {
      if (!params.get('limit')) {
        setSearchParams('limit=10&skip=0&page=1');
        return;
      }

      const page = Number(searchParams.get('page'));
      const limit = Number(searchParams.get('limit')) || 10;
      const skip = (page - 1) * limit;

      params.set('limit', searchParams.get('limit') || '10');
      params.set('skip', `${skip > 0 ? skip : 0}`);

      setSearchParams(params);
    }
  }, [searchParams, setSearchParams]);

  useEffect((): void => {
    fetchDataWithSearchAndInput();
  }, [fetchDataWithSearchAndInput]);

  const simulateError = (): void => {
    setIsError(true);
  };

  return (
    <>
      <Context.Provider value={{ searchValue }}>
        <Header />
        <Router />
      </Context.Provider>
      <div className="btn__error">
        <button onClick={simulateError}>
          Simulate <br /> Error
        </button>

        {isError ? <ErrorComponent /> : ''}
      </div>
    </>
  );
}

export default App;
