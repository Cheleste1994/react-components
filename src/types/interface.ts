import { ReactChild } from 'react';

export interface ErrorBoundaryProps {
  children: ReactChild;
}

export interface ErrorBoundaryState {
  error: Error | null;
}
