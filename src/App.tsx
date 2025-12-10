import './App.css';

import { CurrrentWeather } from './components/CurrentWeather';
import { DailyForecast } from './components/DailyForecast';
import { Header } from './components/Header';
import { HourlyForecast } from './components/HourlyForecast';
import { SearchBar } from './components/SearchBar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <main>
        <SearchBar />
        <CurrrentWeather />
        <DailyForecast />
        <HourlyForecast />
      </main>
      <footer>footer</footer>
    </QueryClientProvider>
  );
}

export default App;
