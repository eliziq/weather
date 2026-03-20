import './App.css';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorPage } from './pages/error.page';
import { Header } from './components/Header/Header';
import { WeatherPage } from './pages/weather.page';
import { useQueryClient } from '@tanstack/react-query';
import { Footer } from './components/Footer/Footer';

function App() {
  const queryClient = useQueryClient();

  return (
    <ErrorBoundary FallbackComponent={ErrorPage} onReset={() => queryClient.resetQueries()}>
      <Header />
      <main>
        <WeatherPage />
      </main>
      <Footer />
    </ErrorBoundary>
  );
}

export default App;
