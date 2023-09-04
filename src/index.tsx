import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './App';
import 'react-toastify/dist/ReactToastify.css';
import { Toaster } from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
const isMobile = window.screen.width <= 768

const toastOptions = {
  style: {
    marginTop: isMobile ? '20vw' : '4vw',
  }
}

ReactDOM.render(
  <div>
    <BrowserRouter>
      <Toaster toastOptions={toastOptions} />
      {/* <ErrorBoundary> */}
      <App />
      {/* </ErrorBoundary> */}
    </BrowserRouter>
    <Helmet>
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-7BDD4BFJRQ"></script>
      <script>
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag() {
              window.dataLayer.push(arguments);
            }
            gtag('js', new Date());
            gtag('config', 'G-7BDD4BFJRQ');
          `}
      </script>
    </Helmet>
  </div>,
  document.getElementById('root')
);