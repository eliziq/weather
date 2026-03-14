import logo from '../../assets/images/logo.svg';
import { UnitsDropdown } from '../UnitsDropdown/UnitsDropdown';

import './header.css';

export const Header = () => {
  return (
    <header>
      <img src={logo} alt="Weather App Logo" className="logo" />
      <UnitsDropdown />
    </header>
  );
};
