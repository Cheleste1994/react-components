import React, { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import makeRequest from './api/data-service';
import './App.scss';
import { Context } from './components/Context/Context';
import ErrorComponent from './components/ErrorComponent';
import Header from './components/Header/Header';
import Router from './routes';
import { ApiResponseState, ProductList } from './types/interface';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState('');
  const [dataSearch, setDataSearch] = useState<ApiResponseState>({
    isLoading: false,
    dataResponse: null,
  });

  const [isError, setIsError] = useState<boolean>(false);

  const fetchDataWithSearchAndInput = useCallback(() => {
    setDataSearch({ dataResponse: null, isLoading: true });
    const url = new URL(baseUrl);

    const params = new URLSearchParams(searchParams);
    const searchValue = params.get('search');
    if (searchValue) {
      setSearchValue(searchValue);
      url.pathname += '/search';
      url.search += `q=${params.get('search')}`;
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

      url.search = params.toString();

      setSearchParams(params);
    }

    makeRequest('GET', url.href)
      .then(({ data }) => {
        if (data) {
          setDataSearch({
            dataResponse: data as ProductList,
            isLoading: false,
          });
        }
      })
      .catch((error) => {
        throw new Error(`Error server: ${error}`);
      });
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    fetchDataWithSearchAndInput();
  }, [fetchDataWithSearchAndInput]);

  const simulateError = () => {
    setIsError(true);
  };

  return (
    <>
      <Context.Provider value={{ dataSearch, searchValue }}>
        <Header />
        <Router />
        <div className="btn__error">
          <button onClick={simulateError}>
            Simulate <br /> Error
          </button>

          {isError ? <ErrorComponent /> : ''}
        </div>
      </Context.Provider>
    </>
  );
}

export default App;
