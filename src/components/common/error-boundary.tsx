'use client';

import { ReactNode } from 'react';
import { ErrorBoundary as ReactErrorBoundary, FallbackProps } from 'react-error-boundary';
import * as Sentry from '@sentry/nextjs';

type Props = {
  children: ReactNode;
  fallback?: React.ReactElement;
};

// A default fallback component to be used when no custom fallback is provided.
function DefaultErrorFallback({ error }: FallbackProps) {
  return (
    <div className="p-4 text-red-500 bg-red-50 border border-red-200 rounded-md" role="alert">
      <p className="font-bold">Something went wrong</p>
      {error?.message && <p className="text-sm mt-1">{error.message}</p>}
    </div>
  );
}

export default function ErrorBoundary({ children, fallback }: Props) {
  // If a fallback element is provided, use it. Otherwise, use the default component.
  const FallbackComponent = fallback ? () => fallback : DefaultErrorFallback;

  return (
    <ReactErrorBoundary
      FallbackComponent={FallbackComponent}
      onError={(error) => {
        Sentry.captureException(error);
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
}
