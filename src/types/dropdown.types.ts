export interface DropdownItem {
  id: string;
  label: string;
}

export interface DropdownProps {
  id: string;
  title?: string;
  data: DropdownItem[];
  hasImage?: boolean;
  style?: string;
  selectedId?: string;
  onSelect?: (id: string) => void;
}
