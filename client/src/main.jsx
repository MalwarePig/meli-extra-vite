import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// Solución temporal para suppress findDOMNode warnings
const consoleError = console.error;
console.error = (...args) => {
  if (!args[0].includes('findDOMNode')) {
    consoleError(...args);
  }
};

const root = createRoot(document.getElementById('root'));

root.render(
  <App />
);