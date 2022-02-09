import App from './App';
import './index.css';
import { AuthProvider } from 'contexts/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from 'ErrorBoundary';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <ErrorBoundary>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ErrorBoundary>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
