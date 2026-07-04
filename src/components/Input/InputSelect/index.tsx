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
  keySelect?: keyof D;
  // keySelect: Extract<keyof D, string>;
  children: ReactNode;
  data: D[];
  name: string;
  inputRef?: RefObject<string>;
  disabled?: boolean;
  className?: ComponentPropsWithRef<'input'>['className'];
  placeholder?: string;
  defaultValue?: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function InputSelect<D extends string | Record<string, any>>({
  children: label,
  data,
  keySelect,
  placeholder,
  disabled,
  name,
  className = '',
  defaultValue,
}: InputSelectProps<D>) {
  // 1. Inicializa o ref com o defaultValue se ele existir

  // useEffect(() => {
  //   if (defaultValue && inputRef && !inputRef.current) {
  //     inputRef.current = defaultValue;
  //   }
  // }, [defaultValue, inputRef]);

  // const handleSelectChange = (value: string) => {
  //   // inputRef.current = value;
  // };

  console.log(data);
  return (
    <div className={cn('w-80 flex flex-col gap-2 mt-2', extractClassesStyles(className, 'w', 'h'))}>
      <label className="capitalize text-lg text-gray-800 font-semibold" htmlFor={label?.toString()}>
        {label}
      </label>
      <Select
        name={name}
        key={defaultValue}
        defaultValue={defaultValue ?? ''}
        disabled={disabled}
        // onValueChange={handleSelectChange}
      >
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

            {data
              ? data.map((item) => {
                  const value = typeof item === 'string' ? item : String(item.id);
                  return (
                    <SelectItem key={value} value={value}>
                      {typeof item === 'string' ? item : keySelect ? (item[keySelect] as ReactNode) : ''}
                    </SelectItem>
                  );
                })
              : ''}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
