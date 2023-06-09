import { useState } from 'react';

import { createContext } from './utils';

export type AppContext = {
  backgroundColor: string;
  setBackgroundColor: (color: string) => void;
};

const [AppProvider, useContext] = createContext<AppContext>({
  name: 'App.Context',
  hookName: 'App.useContext',
  providerName: 'App.Provider',
});

export abstract class App {
  static readonly useContext = useContext;
  static readonly Provider: React.FC<App.AppProps> = ({ children }) => {
    const [backgroundColor, setBackgroundColor] = useState('');

    return (
      <AppProvider value={{ backgroundColor, setBackgroundColor }}>
        {children}
      </AppProvider>
    );
  };
}

export namespace App {
  export type AppProps = {
    children: React.ReactNode;
  };
}
