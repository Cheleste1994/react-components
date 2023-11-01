import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

  const [selectValue, setSelectValue] = useState<string>(
    localStorage.getItem('selectValue') || ''
  );
  const [inputValue, setInputValue] = useState<string>(
    localStorage.getItem('inputValue') || ''
  );

  const [isError, setIsError] = useState<boolean>(false);

  const navigate = useNavigate();

  // const [searchParams, setSearchParams] = useSearchParams();

  const fetchDataWithSearchAndInput = useCallback(() => {
    setDataSearch({ dataResponse: null, isLoading: true });

    const url = new URL(baseUrl);
    if (selectValue) {
      url.pathname += `/${selectValue}`;
      url.searchParams.set('search', inputValue);
    }
    makeRequest('GET', url.href)
      .then(({ data }) => {
        if (data) {
          setDataSearch({
            dataResponse: data as ApiResponse<
              People | Film | Starship | Vehicle | Species | Planet
            >,
            isLoading: false,
          });
          localStorage.setItem('inputValue', inputValue || '');
          localStorage.setItem('selectValue', selectValue || '');

          const params = new URLSearchParams();
          params.set('search', inputValue);
          navigate(selectValue);
          // setSearchParams(params);
        }
      })
      .catch((error) => {
        throw new Error(`Error server: ${error}`);
      });
  }, [inputValue, navigate, selectValue]);

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
    setInputValue('');
  };

  const updateInputValue = (value: string) => {
    setInputValue(value);
  };

  const handlePaginations = async (value: string) => {
    setDataSearch({ ...dataSearch, isLoading: true });

    const { data } = await makeRequest('GET', value).catch((error) => {
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
        updateInputValue={updateInputValue}
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
