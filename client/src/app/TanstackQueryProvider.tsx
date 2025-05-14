'use client';

import { HydrationBoundary, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';

export default function TanstackQueryProvider({ children}:{children:ReactNode}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
       <HydrationBoundary >
        {children}
        </HydrationBoundary>
    </QueryClientProvider>
  );
}