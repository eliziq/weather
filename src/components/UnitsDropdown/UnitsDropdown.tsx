import { useRef, useState } from 'react';
import useOutsideClick from '../../hooks/useOutsideClick';
import useUnitsStore from '../../store/units.store';
import { UNIT_SYSTEMS } from '../../types/units.types';
import icon from '../../assets/images/icon-dropdown.svg';
import './units-dropdown.css';

const unitsData = [
  {
    group: 'Temperature',
    id: 'temperature',
    options: [
      { label: 'Celsius (°C)', id: UNIT_SYSTEMS.METRIC },
      { label: 'Fahrenheit (°F)', id: UNIT_SYSTEMS.IMPERIAL },
    ],
  },
  {
    group: 'Wind Speed',
    id: 'wind-speed',
    options: [
      { label: 'm/s', id: UNIT_SYSTEMS.METRIC },
      { label: 'mph', id: UNIT_SYSTEMS.IMPERIAL },
    ],
  },
  {
    group: 'Precipitation',
    id: 'precipitation',
    options: [
      { label: 'mm', id: UNIT_SYSTEMS.METRIC },
      { label: 'inches', id: UNIT_SYSTEMS.IMPERIAL },
    ],
  },
];

export const UnitsDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { currentSystem, toggleSystem } = useUnitsStore();

  useOutsideClick({ ref: dropdownRef, handler: () => setIsOpen(false) });

  return (
    <div ref={dropdownRef} className="dropdown-container ">
      <button onClick={() => setIsOpen(!isOpen)} className="dropdown-button">
        <span>Units: {currentSystem === UNIT_SYSTEMS.METRIC ? 'Metric' : 'Imperial'}</span>
        <img className="dropdown-icon" src={icon} alt="" />
      </button>

      {isOpen && (
        <div className="dropdown-menu units-dropdown">
          <div className="units-header">
            <button onClick={toggleSystem} className="toggle-button">
              Switch to {currentSystem === UNIT_SYSTEMS.METRIC ? 'Imperial' : 'Metric'}
            </button>
          </div>

          {unitsData.map((group) => (
            <div key={group.id} className="units-group">
              <label>{group.group}</label>
              <ul>
                {group.options.map((opt) => (
                  <li key={opt.label} className={currentSystem === opt.id ? 'dd-selected' : ''}>
                    {opt.label}
                    {currentSystem === opt.id && <span>&#10003;</span>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
