import { ErrorBoundary } from 'react-error-boundary'
function ErrorFallback({ error, resetErrorBoundary }: any) {
  return (
    <>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>retry</button>
    </>
  )
}

function Boundary({ children }: any) {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // reset state here
      }}
    >
      {children}
    </ErrorBoundary>
  )
}

export default Boundary
