import logo from '../../assets/images/logo.svg';
// import { Dropdown } from '../shared/Dropdown/Dropdown';

import './header.css';

export const Header = () => {
  return (
    <header>
      <img src={logo} alt="Weather App Logo" className="logo" />
      {/* <Dropdown /> */}
    </header>
  );
};
