import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

type ReactQueryProviderProps = {
  children: React.ReactNode;
};

export const ReactQueryProvider: React.FC<ReactQueryProviderProps> = ({
  children,
}: ReactQueryProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
