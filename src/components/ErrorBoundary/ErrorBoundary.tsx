import React, { Component, ReactNode } from 'react';
import headerStyles from '../Header/Header.module.scss';
import LogoLoad from '../LogoLoad/LogoLoad';
import mainStyles from '../Main/Main.module.scss';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  reloadPage = () => {
    window.location.reload();
  };

  render(): ReactNode {
    const { hasError } = this.state;

    if (hasError) {
      return (
        <>
          <header className={headerStyles.header} />
          <main className={mainStyles.main}>
            <LogoLoad />
            <div>
              <span>Something went wrong!</span>
              <button onClick={this.reloadPage}>Reload</button>
            </div>
          </main>
        </>
      );
    }

    return this.props.children;
  }
}
