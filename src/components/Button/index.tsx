import clsx from 'clsx';
import React, { ComponentPropsWithoutRef } from 'react';

type ButtonProps = {
  children: React.ReactNode;
  variant: 'confirm' | 'default' | 'customize';
} & ComponentPropsWithoutRef<'button'>;

export default function Button({ children, variant, className }: ButtonProps) {
  const buttonDefault = clsx('text-xl py-2 px-4 rounded-2xl');
  const buttonVariantes: Record<ButtonProps['variant'], string> = {
    confirm: clsx('bg-gray-950 text-gray-50 hover:scale-105 hover:bg-gray-900 cursor-pointer transition'),
    customize: '',
    default: '',
  };
  return <button className={clsx(buttonDefault, buttonVariantes[variant], className)}>{children}</button>;
}
