import { useState } from 'react';
import IconLight from '../../assets/images/light_mode.svg';
import IconDark from '../../assets/images/mode_night.svg';
import './theme-toggle.css';

export const ThemeToggle = () => {
  const [isLight, setIsLight] = useState(document.documentElement.classList.contains('light-theme'));

  const toggleTheme = () => {
    const root = document.documentElement;
    if (isLight) {
      root.classList.remove('light-theme');
      root.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
      setIsLight(false);
    } else {
      root.classList.remove('dark-theme');
      root.classList.add('light-theme');
      localStorage.setItem('theme', 'light');
      setIsLight(true);
    }
  };

  return (
    <button type="button" onClick={toggleTheme} className="theme-toggle" aria-label="Toggle dark mode">
      {isLight ? <img src={IconLight} alt="Light mode" /> : <img src={IconDark} alt="Dark mode" />}
    </button>
  );
};
