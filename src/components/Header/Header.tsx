import React, { Component, ReactNode } from 'react';
import { AppProps, AppState } from '../../types/interface';
import styles from './Header.module.scss';
import svg from '../../assets/search.svg';

export default class Header extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      dataRoot: null,
      isLoading: true,
      inputValue: localStorage.getItem('inputValue') || '',
      selectValue: '',
    };
  }

  componentDidUpdate(prevProps: AppProps) {
    if (this.props.dataRoot !== prevProps.dataRoot) {
      this.setState({
        dataRoot: this.props.dataRoot,
        isLoading: false,
      });
    }
  }

  render(): ReactNode {
    const { dataRoot, inputValue } = this.state;
    let valueOption: string[] | [] = [];

    if (dataRoot) {
      valueOption = Object.keys(dataRoot);
    }

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
      this.setState({ inputValue: event.target.value });
    };

    const handleSearchClick = (
      event?: React.KeyboardEvent<HTMLInputElement>
    ) => {
      if (!event || event?.code === 'Enter') {
        if (this.props.selectValue) {
          this.props.updateInputValue?.(this.state.inputValue?.trim() || '');
        }
      }
    };

    const handleSelectChange = (
      event: React.ChangeEvent<HTMLSelectElement>
    ) => {
      this.setState({ inputValue: '', selectValue: event.target.value });
      this.props.updateSelectValue?.(event.target.value);
    };

    return (
      <header className={styles.header}>
        <div>React. Components</div>
        <div>
          <img src={svg} alt="search" onClick={() => handleSearchClick()} />
          <select value={this.props.selectValue} onChange={handleSelectChange}>
            <option disabled={!!this.props.selectValue}>
              {this.state.isLoading ? 'Loading...' : 'Section'}
            </option>
            {valueOption.map((value, index) => (
              <option key={value + index}>{value}</option>
            ))}
          </select>
          <input
            list="starWars"
            placeholder={
              this.state.isLoading
                ? 'Loading...'
                : this.props.selectValue
                ? ''
                : 'Select section'
            }
            value={inputValue}
            onChange={handleInput}
            disabled={this.props.isLoading}
            onKeyDown={handleSearchClick}
          />
        </div>
      </header>
    );
  }
}
