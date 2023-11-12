import { createContext } from 'react';
import { AppProps } from '../../types/interface';

export const Context = createContext<AppProps>({ searchValue: '' });
