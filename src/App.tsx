import './App.css';
import { useEffect } from 'react';
import { getUsersLocation } from './utils/getUsersLocation';
import { CurrrentWeather } from './components/CurrentWeather/CurrentWeather';
import { DailyForecast } from './components/DailyForecast/DailyForecast';
import { Header } from './components/Header/Header';
import { HourlyForecast } from './components/HourlyForecast/HourlyForecast';
import { CitySearch } from './components/CitySearch/CitySearch';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    getUsersLocation();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <main>
        <h1>How's the sky looking today?</h1>
        <CitySearch />
        <CurrrentWeather />
        <DailyForecast />
        <HourlyForecast />
      </main>
      <footer>footer</footer>
    </QueryClientProvider>
  );
}

export default App;
