import { cn } from '@/utils/formats-functions';

import { ReactNode } from 'react';

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export default function Container({ children, className = '' }: ContainerProps) {
  return <div className={cn('px-10', 'mt-5', className)}>{children}</div>;
}
