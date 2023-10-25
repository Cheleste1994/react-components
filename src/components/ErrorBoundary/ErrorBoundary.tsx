import React, { Component, ReactNode } from 'react';
import { ErrorBoundaryProps, ErrorBoundaryState } from '../../types/interface';

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    error: null,
  };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render(): ReactNode {
    const { error } = this.state;

    if (error) {
      return (
        <div>
          <p>Not found!</p>
          <p>{error.message}</p>
        </div>
      );
    }
    return this.props.children;
  }
}
