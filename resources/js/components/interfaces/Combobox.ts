import { Dispatch } from "react";

interface ComboboxItem {
  id: string | number;
  value: string | number;
  label: string;
}

export interface ComboboxProps {
  items?: ComboboxItem[];

  value?: (string | number)[];
  onChange?: (values: (string | number)[]) => void;
  placeholder?: string;
  multiple?: boolean;
  disabled?: boolean;

  searchPlaceholder?: string;
  emptyMessage?: string;
  className?: string;

  onSelected?: Dispatch<React.SetStateAction<string | number>>;
}