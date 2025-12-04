// This file is the entry point, but the logic is already in App.tsx due to the structure request.
// However, the prompt asks for index.tsx to be the entry point.
// I have included the render logic in App.tsx content above for simplicity as is common in single-file React examples,
// but to strictly adhere to the file structure requested:

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
