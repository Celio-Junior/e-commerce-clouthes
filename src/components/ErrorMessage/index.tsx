import { cn } from '@/utils/formats-functions';
import { ReactNode } from 'react';

type ErrorMessageProps = {
  title?: ReactNode;
  codeTitle: string | number;
  content: ReactNode;
};
export default function ErrorMessage({ codeTitle, title, content }: ErrorMessageProps) {
  return (
    <>
      {title && <title>{title}</title>}
      <div
        className={cn(
          'min-h-140 bg-slate-900 text-slate-100',
          'p-8 mt-20',
          'rounded-3xl',
          'flex items-center justify-center',
          'gap-6',
        )}
      >
        <h1 className="font-extrabold text-4xl sm:text-7xl transition-all">{codeTitle}</h1>
        <span className="text-3xl sm:text-5xl">|</span>
        <p className="text-2md sm:text-2xl">{content}</p>
      </div>
    </>
  );
}
