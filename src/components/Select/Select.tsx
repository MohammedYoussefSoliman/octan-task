import * as SelectPrimitive from '@radix-ui/react-select';

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

import { SelectContent } from './SelectContent';
import { SelectItem } from './SelectItem';
import { SelectLabel } from './SelectLabel';
import { SelectTrigger } from './SelectTrigger';

type SelectProps = {
  label?: string;
  placeholder?: string;
  onValueChange?: (value: string) => void;
  value?: string;
  options: { value: string; label: string }[];
};

export function SelectInput({
  label,
  options,
  placeholder,
  value,
  onValueChange,
}: SelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="bg-white">
        <SelectGroup>
          {label && <SelectLabel>{label}</SelectLabel>}
          {options.map((option) => (
            <SelectItem key={option.label} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
