import './App.css';
import { useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorPage } from './pages/error.page';
import { getUsersLocation } from './utils/getUsersLocation';
import { Header } from './components/Header/Header';
import { WeatherPage } from './pages/weather.page';
import { useQueryClient } from '@tanstack/react-query';

function App() {
  const queryClient = useQueryClient();

  useEffect(() => {
    getUsersLocation();
  }, []);

  return (
    <ErrorBoundary FallbackComponent={ErrorPage} onReset={() => queryClient.resetQueries()}>
      <Header />
      <main>
        <WeatherPage />
      </main>
      <footer>footer</footer>
    </ErrorBoundary>
  );
}

export default App;
