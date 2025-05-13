import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import ChakraUIProvider from '@/providers/ChakraProvider/provider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraUIProvider>
      <App />
    </ChakraUIProvider>
  </React.StrictMode>
);
