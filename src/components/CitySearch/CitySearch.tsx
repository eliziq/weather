import { useEffect, useRef, useState } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import { useCitySearch } from '../../hooks/useCitySearch';
import useOutsideClick from '../../hooks/useOutsideClick';
import { type CityResult } from '../../types/location.types';
import useLocationStore from '../../store/location.store';
import './city-search.css';

export const CitySearch = () => {
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLFormElement>(null);

  const debouncedQuery = useDebounce(query, 300);

  const { data: results, isLoading, isError } = useCitySearch(debouncedQuery);
  useOutsideClick({ ref: dropdownRef, handler: () => setShowResults(false) });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowResults(false);
        (document.activeElement as HTMLElement)?.blur();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelect = ({ latitude, longitude, name, country }: CityResult) => {
    const location = { latitude, longitude };
    const { setLocation, setParsedLocation } = useLocationStore.getState();
    setQuery('');
    setLocation(location);
    setParsedLocation({ city: name, country });
    setShowResults(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setShowResults(true);
    if (e.target.value === '') setShowResults(false);
  };

  const handleFocus = () => {
    if (results?.length) {
      setShowResults(true);
    }
  };

  return (
    <form ref={dropdownRef} className="search-bar">
      <div className="input-container">
        <input
          id="search"
          type="text"
          value={query}
          onFocus={handleFocus}
          onChange={handleInputChange}
          placeholder="Search city..."
        />
        {showResults && (
          <ul className="results-list">
            {results?.map((city) => (
              <li key={city.id} onClick={() => handleSelect(city)}>
                {city.name}, {city.country}
              </li>
            ))}
            {isError || results?.length === 0 ? <li>City not found</li> : ''}
            {isLoading ? <li>Searching...</li> : ''}
          </ul>
        )}
      </div>
      <button type="submit">Search</button>
    </form>
  );
};
