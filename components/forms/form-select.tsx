import { FormField } from '@/components/forms/form-field';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

export type FormSelectOption = {
  label: string;
  value: string;
};

export interface FormSelectProps {
  id?: string;
  name?: string;
  label?: string;
  helper?: string;
  error?: string;
  required?: boolean;
  placeholder?: string;
  options: FormSelectOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  disabled?: boolean;
}

export function FormSelect({
  id,
  name,
  label,
  helper,
  error,
  required,
  placeholder = 'Select…',
  options,
  value,
  defaultValue,
  onValueChange,
  className,
  disabled,
}: FormSelectProps) {
  const selectId = id ?? name;

  return (
    <FormField label={label} htmlFor={selectId} helper={helper} error={error} required={required}>
      <Select
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        disabled={disabled}
      >
        <SelectTrigger
          id={selectId}
          aria-invalid={!!error}
          className={cn(error && 'border-destructive', className)}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FormField>
  );
}
