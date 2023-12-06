import { Provider } from 'react-redux';
import Header from './Header/Header';
import { store } from '../redux/store';
import { ReactElement } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Provider store={store}>
        <Header {...(children as ReactElement)?.props} />
        {children}
      </Provider>
    </>
  );
}
