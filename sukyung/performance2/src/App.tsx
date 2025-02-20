import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Images from './assets/Images';

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Images />
    </QueryClientProvider>
  );
}

export default App;
