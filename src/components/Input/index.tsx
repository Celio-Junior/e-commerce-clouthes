'use client';
import { clsx } from 'clsx';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import React, { ComponentPropsWithRef, useState } from 'react';

type InputProps = {
  children: React.ReactNode;
} & ComponentPropsWithRef<'input'>;

export default function Input({ type = 'text', className, children, name, ...rest }: InputProps) {
  const [isViewPassword, setIsViewPassword] = useState(false);
  const inputDivClass = clsx('flex flex-col gap-2 mt-2');

  const handleClick = () => setIsViewPassword((prev) => !prev);
  return (
    <div className={inputDivClass}>
      <label className="capitalize text-lg text-blue-600 font-semibold" htmlFor={name}>
        {children}
      </label>
      <div className="relative flex items-center">
        <input
          type={isViewPassword ? 'text' : type}
          name={name}
          className={clsx(
            'border-2 rounded-lg py-1 px-2 w-full',
            'placeholder:text-gray-400 placeholder:font-light text-gray-800 font-semibold',
            className,
          )}
          {...rest}
        />
        {type === 'password' && (
          <span onClick={handleClick} className="absolute right-2 z-10 cursor-pointer hover:scale-105">
            {isViewPassword ? <EyeOffIcon /> : <EyeIcon />}
          </span>
        )}
      </div>
    </div>
  );
}
