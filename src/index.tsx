import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './App';
import 'react-toastify/dist/ReactToastify.css';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
const isMobile = window.screen.width <= 768

const toastOptions = {
  style: {
    marginTop: isMobile ? '20vw' : '4vw',
  }
}

ReactDOM.render(
  <BrowserRouter>
    <Toaster toastOptions={toastOptions} />
    <HelmetProvider>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </HelmetProvider>
  </BrowserRouter>,
  document.getElementById('root')
);