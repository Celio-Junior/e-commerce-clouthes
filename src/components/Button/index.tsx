import { cn } from '@/utils/formats-functions';

import React, { ComponentPropsWithoutRef } from 'react';

type ButtonProps = {
  children: React.ReactNode;
  variant?: 'confirm' | 'default' | 'customize';
  size?: 'md' | 'lg' | 'xl';
} & ComponentPropsWithoutRef<'button'>;

export default function Button({
  children,
  variant = 'default',
  className,
  size = 'xl',
  ...rest
}: ButtonProps) {
  const buttonDefault = cn(
    'text-xl gap-2  rounded-2xl hover:scale-105 cursor-pointer transition flex items-center justify-center',
  );
  const buttonVariantes: Record<NonNullable<ButtonProps['variant']>, string> = {
    confirm: cn('bg-blue-600 text-gray-50 hover:bg-gray-900'),
    customize: '',
    default: cn('bg-gray-950 text-gray-50 hover:bg-gray-900'),
  };

  const buttonSizes: Record<NonNullable<ButtonProps['size']>, string> = {
    md: cn('text-md py-1 px-2'),
    lg: cn('text-lg py-1 px-3 '),
    xl: cn('text-xl py-2 px-4'),
  };
  return (
    <button {...rest} className={cn(buttonDefault, buttonVariantes[variant], buttonSizes[size], className)}>
      {children}
    </button>
  );
}
