import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './theme';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <ChakraProvider theme={theme} resetCSS>
        <App />
      </ChakraProvider>
    </ReduxProvider>
  </React.StrictMode>
);

