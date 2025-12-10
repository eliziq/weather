import logo from '../assets/images/logo.svg';
import { Dropdown } from './Dropdown';

export const Header = () => {
	return (
		<header>
			<img src={logo} alt="Weather App Logo" />
			<Dropdown />
		</header>
	);
};
