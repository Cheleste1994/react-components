import React, { Component, ReactNode } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Main from './components/Main/Main';

class App extends Component {
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  render(): ReactNode {
    return (
      <>
        <Header />
        <Main />
      </>
    );
  }
}

export default App;
