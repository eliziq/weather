import { useEffect, useRef, useState } from 'react';
import useOutsideClick from '../../../hooks/useOutsideClick';
import icon from '../../../assets/images/icon-dropdown.svg';
import type { DropdownProps, DropdownItem } from '../../../types/dropdown.types';
import './dropdown.css';

export const Dropdown = ({ id, title = 'Select', data, selectedId, onSelect }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<DropdownItem | undefined>(
    selectedId ? data?.find((item) => item.id === selectedId) : undefined
  );

  const dropdownRef = useRef<HTMLDivElement>(null);

  useOutsideClick({ ref: dropdownRef, handler: () => setIsOpen(false) });

  const handleChange = (item: DropdownItem) => {
    setSelectedItem(item);
    onSelect && onSelect(item.id);
    setIsOpen(false);
  };

  useEffect(() => {
    if (selectedId && data) {
      const newSelectedItem = data.find((item) => item.id === selectedId);
      newSelectedItem && setSelectedItem(newSelectedItem);
    } else {
      setSelectedItem(undefined);
    }
  }, [selectedId, data]);

  return (
    <div ref={dropdownRef} className="dropdown-container">
      <button
        id={id}
        aria-label="Toggle dropdown"
        aria-haspopup="true"
        aria-expanded={isOpen}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="dropdown-button">
        <span>{selectedItem?.label || title}</span>
        <img className="dropdown-icon" src={icon} alt="Dropdown icon" />
      </button>

      {isOpen && (
        <div aria-label="Dropdown menu" className="dropdown-menu">
          <ul role="menu" aria-labelledby={id} aria-orientation="vertical">
            {data?.map((item) => (
              <li
                key={item.id}
                onClick={() => handleChange(item)}
                className={selectedItem?.id === item.id ? 'dd-selected' : ''}>
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
