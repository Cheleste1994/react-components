import React, { Component, ReactNode } from 'react';
import makeRequest from './api/data-service';
import './App.scss';
import ErrorComponent from './components/ErrorComponent';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import {
  ApiResponse,
  AppProps,
  AppState,
  Film,
  People,
  Planet,
  RootApi,
  Species,
  Starship,
  Vehicle,
} from './types/interface';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      dataRoot: null,
      inputValue: localStorage.getItem('inputValue') || '',
      selectValue: localStorage.getItem('selectValue') || '',
      dataResponse: undefined,
      isLoading: false,
      isError: false,
    };
  }

  async componentDidMount() {
    const responseRoot = await makeRequest<RootApi>('GET', baseUrl).catch(
      (error) => {
        throw new Error(`Error server: ${error}`);
      }
    );

    if (responseRoot.data) {
      this.setState({ dataRoot: responseRoot.data });
    }

    if (this.state.selectValue) {
      const { data } = await makeRequest(
        'GET',
        `${baseUrl}/${this.state.selectValue}/?search=${this.state.inputValue}`
      ).catch((error) => {
        throw new Error(`Error server: ${error}`);
      });
      if (data) {
        this.setState({
          dataResponse: data as ApiResponse<
            People | Film | Starship | Vehicle | Species | Planet
          >,
          isLoading: false,
        });
      }
    }
  }

  async componentDidUpdate(_: AppProps, prevState: AppState) {
    if (this.state.selectValue !== prevState.selectValue) {
      this.setState({ isLoading: true });
      const { data } = await makeRequest(
        'GET',
        `${baseUrl}/${this.state.selectValue}`
      ).catch((error) => {
        throw new Error(`Error server: ${error}`);
      });
      if (data) {
        this.setState({
          dataResponse: data as ApiResponse<
            People | Film | Starship | Vehicle | Species | Planet
          >,
        });
        localStorage.setItem('inputValue', this.state.inputValue || '');
        localStorage.setItem('selectValue', this.state.selectValue || '');
      }
      this.setState({ isLoading: false });
    }

    if (this.state.inputValue !== prevState.inputValue) {
      this.setState({ isLoading: true });
      const { data } = await makeRequest(
        'GET',
        `${baseUrl}/${this.state.selectValue}/?search=${this.state.inputValue}`
      ).catch((error) => {
        throw new Error(`Error server: ${error}`);
      });
      if (data) {
        this.setState({
          dataResponse: data as ApiResponse<
            People | Film | Starship | Vehicle | Species | Planet
          >,
        });
        localStorage.setItem('inputValue', this.state.inputValue || '');
        localStorage.setItem('selectValue', this.state.selectValue || '');
      }
      this.setState({ isLoading: false });
    }
  }

  simulateError = () => {
    this.setState({ isError: true });
  };

  render(): ReactNode {
    const updateSelectValue = (value: string) => {
      this.setState({ selectValue: value });
    };

    const updateInputValue = (value: string) => {
      this.setState({ inputValue: value });
    };

    const handlePaginations = async (value: string) => {
      this.setState({
        isLoading: true,
      });
      const { data } = await makeRequest('GET', value).catch((error) => {
        alert(`Error server: ${error}`);
        throw new Error(`Error server: ${error}`);
      });
      if (data) {
        this.setState({
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
          dataRoot={this.state.dataRoot}
          inputValue={this.state.inputValue}
          selectValue={this.state.selectValue}
          updateInputValue={updateInputValue}
          updateSelectValue={updateSelectValue}
        />
        <Main
          dataRoot={this.state.dataRoot}
          dataResponse={this.state.dataResponse}
          inputValue={this.state.inputValue}
          selectValue={this.state.selectValue}
          handlePaginations={handlePaginations}
          isLoading={this.state.isLoading}
        />
        <div className="btn__error">
          <button onClick={this.simulateError}>
            Simulate <br /> Error
          </button>

          {this.state.isError ? <ErrorComponent /> : ''}
        </div>
      </>
    );
  }
}

export default App;
