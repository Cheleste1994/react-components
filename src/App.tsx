import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import makeRequest from './api/data-service';
import './App.scss';
import ErrorComponent from './components/ErrorComponent';
import Header from './components/Header/Header';
import Router from './routes';
import {
  ApiResponse,
  ApiResponseState,
  Film,
  People,
  Planet,
  RootApi,
  Species,
  Starship,
  Vehicle,
} from './types/interface';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

function App() {
  const [dataRoot, setDataRoot] = useState<null | RootApi>(null);

  const [dataSearch, setDataSearch] = useState<
    ApiResponseState<People | Film | Starship | Vehicle | Species | Planet>
  >({
    isLoading: false,
    dataResponse: null,
  });

  const location = useLocation();

  const [selectValue, setSelectValue] = useState<string>(
    location.pathname.split('/')[0] || localStorage.getItem('selectValue') || ''
  );

  const [isError, setIsError] = useState<boolean>(false);

  const navigate = useNavigate();

  const fetchDataWithSearchAndInput = useCallback(() => {
    setDataSearch({ dataResponse: null, isLoading: true });

    const url = new URL(baseUrl);
    const params = new URLSearchParams(location.search);

    if (selectValue) {
      url.pathname += `/${selectValue}`;
      url.search += params.toString();
      makeRequest('GET', url.href)
        .then(({ data }) => {
          if (data) {
            setDataSearch({
              dataResponse: data as ApiResponse<
                People | Film | Starship | Vehicle | Species | Planet
              >,
              isLoading: false,
            });
            localStorage.setItem('selectValue', selectValue || '');
          }
        })
        .catch((error) => {
          throw new Error(`Error server: ${error}`);
        });
    }
  }, [location.search, selectValue]);

  useEffect(() => {
    if (!dataRoot) {
      makeRequest<RootApi>('GET', baseUrl)
        .then(({ data }) => {
          if (data) {
            setDataRoot(data || null);
          }
        })
        .catch((error) => {
          throw new Error(`Error server: ${error}`);
        });
    }
  }, [dataRoot]);

  useEffect(() => {
    fetchDataWithSearchAndInput();
  }, [fetchDataWithSearchAndInput]);

  const simulateError = () => {
    setIsError(true);
  };

  const updateSelectValue = (value: string) => {
    setDataSearch({ dataResponse: null, isLoading: true });
    setSelectValue(value);
    navigate(`/${value}`);
  };

  const handlePaginations = async () => {
    setDataSearch({ ...dataSearch, isLoading: true });
    const url = new URL(baseUrl);
    const params = new URLSearchParams(location.search);
    url.pathname += location.pathname;
    url.search += params.toString();

    const { data } = await makeRequest('GET', url.href).catch((error) => {
      alert(`Error server: ${error}`);
      throw new Error(`Error server: ${error}`);
    });
    if (data) {
      setDataSearch({
        dataResponse: data as ApiResponse<
          People | Film | Starship | Vehicle | Species | Planet
        >,
        isLoading: false,
      });
    }
  };

  return (
    <>
      <Header
        dataRoot={dataRoot}
        selectValue={selectValue}
        updateSelectValue={updateSelectValue}
      />
      <Router
        dataSearch={dataSearch}
        selectValue={selectValue}
        handlePaginations={handlePaginations}
      />
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
