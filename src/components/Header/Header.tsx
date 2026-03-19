import logo from '../../assets/images/logo.svg';
import { UnitsDropdown } from '../UnitsDropdown/UnitsDropdown';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';

import './header.css';

export const Header = () => {
  return (
    <header>
      <img src={logo} alt="Weather App Logo" className="logo" />
      <ThemeToggle />
      <UnitsDropdown />
    </header>
  );
};
