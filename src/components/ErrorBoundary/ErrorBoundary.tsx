import React, { useState, useEffect } from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

function ErrorBoundary({ children }: ErrorBoundaryProps) {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const handleError = (errorMessage: string, source: string, lineno: number, colno: number, error: Error) => {
      console.error(error);
      setHasError(true);
      setError(error);
    };

    // Cast handleError to OnErrorEventHandler
    const errorHandler: OnErrorEventHandler = handleError as OnErrorEventHandler;

    // Capture unhandled errors
    window.onerror = errorHandler;

    return () => {
      // Remove the error handler when the component unmounts
      window.onerror = null;
    };
  }, []);

  if (hasError) {
    return (
      <div className="error-boundary__container">
        <h2>Oops! Algo salió mal.</h2>
        <p className="error-boundary__error">Error: {error?.message}</p>
        <p className="error-boundary__message">Actualiza la página o intenta nuevamente luego.</p>
      </div>
    );
  }

  return <>{children}</>;
}

export default ErrorBoundary;
