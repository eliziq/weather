import { type FallbackProps } from 'react-error-boundary';

export const ErrorPage = ({ error, resetErrorBoundary }: FallbackProps) => {
  const errorMessage = (error as Error)?.message || "We couldn't find the data you were looking for.";
  return (
    <>
      <h1>Something went wrong</h1>
      <h4>{errorMessage}</h4>
      <button type="button" onClick={resetErrorBoundary} className="retry-button">
        Retry
      </button>
    </>
  );
};
