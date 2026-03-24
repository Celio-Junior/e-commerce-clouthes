import { ZodError } from 'zod';
import { twMerge } from 'tailwind-merge';
import clsx, { ClassValue } from 'clsx';
export function formatZodMessage<T>(errors: ZodError<T>) {
  return errors.issues.map((err) => err.message);
}

export function cn(...classes: ClassValue[]) {
  return twMerge(clsx(classes, 'ta'));
}
