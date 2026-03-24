import { cn } from '@/utils/formats-functions';
import clsx from 'clsx';
import React, { ComponentPropsWithoutRef } from 'react';

type ButtonProps = {
  children: React.ReactNode;
  variant?: 'confirm' | 'default' | 'customize';
} & ComponentPropsWithoutRef<'button'>;

export default function Button({ children, variant = 'default', className }: ButtonProps) {
  const buttonDefault = cn('text-xl py-2 px-4 rounded-2xl hover:scale-105 cursor-pointer transition');
  const buttonVariantes: Record<NonNullable<ButtonProps['variant']>, string> = {
    confirm: cn('bg-gray-950 text-gray-50 hover:bg-gray-900'),
    customize: '',
    default: cn('bg-gray-950 text-gray-50 hover:bg-gray-900'),
  };
  return <button className={clsx(buttonDefault, buttonVariantes[variant], className)}>{children}</button>;
}
