import React, { useState, useEffect } from 'react'

interface ErrorBoundaryProps {
  children: React.ReactNode
}

function ErrorBoundary({ children }: ErrorBoundaryProps) {
  const [hasError, setHasError] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const handleError = (errorEvent: ErrorEvent) => {
      const errorMessage = errorEvent.message
      console.error(errorEvent)
      setHasError(true)
      setError(new Error(errorMessage))
    }

    window.addEventListener('error', handleError)

    return () => {
      window.removeEventListener('error', handleError)
    }
  }, [])

  if (hasError) {
    return (
      <div>
        <h2>Oops! Algo salió mal.</h2>
        <p>Error: {error?.message}</p>
        <p>Actualiza la página o intenta nuevamente luego.</p>
      </div>
    )
  }

  return <>{children}</>
}

export default ErrorBoundary
