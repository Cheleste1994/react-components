import React, { Component, ReactNode } from 'react';
import makeRequest from './api/data-service';
import './App.scss';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
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
    };
  }

  async componentDidMount() {
    const dataRoot = await makeRequest<RootApi>('GET', baseUrl);
    if (dataRoot.data) {
      this.setState({ dataRoot: dataRoot.data });
    }

    if (this.state.selectValue) {
      const { data } = await makeRequest(
        'GET',
        `${baseUrl}/${this.state.selectValue}/?search=${this.state.inputValue}`
      );
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
      );
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
      );
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
      const { data } = await makeRequest('GET', value);
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
      <ErrorBoundary>
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
        </>
      </ErrorBoundary>
    );
  }
}

export default App;
