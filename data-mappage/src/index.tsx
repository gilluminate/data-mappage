import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { SystemsProvider } from './providers/SystemsProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <SystemsProvider>
      <App />
    </SystemsProvider>
  </React.StrictMode>
);
