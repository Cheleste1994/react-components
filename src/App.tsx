import React, { Component, ReactNode } from 'react';
import './App.scss';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Header from './components/Header/Header';
import Main from './components/Main/Main';

class App extends Component {
  render(): ReactNode {
    return (
      <>
        <Header />
        <ErrorBoundary>
          <Main />
        </ErrorBoundary>
      </>
    );
  }
}

export default App;
