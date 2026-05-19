import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { extractClassesStyles } from '@/utils/extract-classes-styles';
import { cn } from '@/utils/formats-functions';
import { ComponentPropsWithRef, ReactNode, RefObject } from 'react';

type InputSelectProps<D> = {
  children: ReactNode;
  data: D;
  inputRef: RefObject<string>;
  disabled?: boolean;
  className?: ComponentPropsWithRef<'input'>['className'];
  placeholder?: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function InputSelect<D extends (string | (object & Record<string, any>))[]>({
  children: label,
  data,
  inputRef,
  placeholder,
  disabled,
  className = '',
}: InputSelectProps<D>) {
  const handleSelectChange = (value: string) => {
    console.log(value);
    inputRef.current = value;
  };

  return (
    <div className={cn('w-full flex flex-col gap-2 mt-2', extractClassesStyles(className, 'w', 'h'))}>
      <label className="capitalize text-lg text-gray-800 font-semibold" htmlFor={label?.toString()}>
        {label}
      </label>
      <Select disabled={disabled} onValueChange={handleSelectChange}>
        <SelectTrigger
          className={cn(
            'border-2 rounded-lg py-1 px-2 bg-gray-100/10',
            'w-full',
            'placeholder:text-gray-400 placeholder:font-light text-gray-800 font-semibold',
            className,
          )}
        >
          <SelectValue placeholder={placeholder ?? ''} />
        </SelectTrigger>
        <SelectContent position="item-aligned">
          <SelectGroup>
            <SelectLabel>{label}</SelectLabel>

            {data?.map((item) => {
              const value = typeof item === 'string' ? item : item.id;
              return (
                <SelectItem key={value} value={value}>
                  {typeof item === 'string' ? item : item.label}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
