import { ReactNode } from 'react';

type SubTitleProps = {
  title: ReactNode;
  description?: SubTitleProps['title'];
};
export default function SubTitle({ title, description }: SubTitleProps) {
  return (
    <div>
      <h1 className="font-bold text-3xl">{title}</h1>
      {description && <p className="text-sm text-gray-500">{description}</p>}
    </div>
  );
}
