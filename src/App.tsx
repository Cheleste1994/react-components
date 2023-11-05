import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import makeRequest from './api/data-service';
import './App.scss';
import ErrorComponent from './components/ErrorComponent';
import Header from './components/Header/Header';
import Router from './routes';
import { ApiResponseState, ProductList } from './types/interface';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [dataSearch, setDataSearch] = useState<ApiResponseState>({
    isLoading: false,
    dataResponse: null,
  });

  const location = useLocation();

  const [isError, setIsError] = useState<boolean>(false);

  const fetchDataWithSearchAndInput = useCallback(() => {
    setDataSearch({ dataResponse: null, isLoading: true });

    const url = new URL(baseUrl);

    const params = new URLSearchParams(location.search);

    if (params.get('search')) {
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
  }, [location.search, searchParams, setSearchParams]);

  useEffect(() => {
    fetchDataWithSearchAndInput();
  }, [fetchDataWithSearchAndInput]);

  const simulateError = () => {
    setIsError(true);
  };

  return (
    <>
      <Header dataSearch={dataSearch} />
      <Router dataSearch={dataSearch} />
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
