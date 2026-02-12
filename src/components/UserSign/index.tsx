'use client';
import clsx from 'clsx';
import Image from 'next/image';
import Sign from './Sign';
import { CircleXIcon } from 'lucide-react';

import { useContextViewFormUser } from '@/context/ViewFormUser/useContext';

export default function UserSign() {
  const [{ setSignUser }, { isViewFormLogin }] = useContextViewFormUser();

  return (
    <div
      className={clsx(
        'fixed',
        'w-full h-full bg-black/80 l-0 border-box left-0 top-0',
        'flex justify-center items-center',
      )}
    >
      <div
        className={clsx(
          'bg-gray-200',
          'w-4xl',
          'transition',
          'h-[60%]',
          !isViewFormLogin && 'h-[80%]',
          'rounded-2xl',
          'shadow-sm shadow-gray-200',
          'flex relative',
        )}
      >
        <span
          className="absolute right-3 top-2 cursor-pointer transition hover:scale-105"
          onClick={() => setSignUser(() => false)}
        >
          <CircleXIcon size={30} />
        </span>

        <div
          style={{ borderTopLeftRadius: 16, borderBottomLeftRadius: 16 }}
          className="w-[40%] h-full overflow-hidden"
        >
          <Image
            style={{ objectFit: 'cover', objectPosition: '20% top ' }}
            src={'/images/login-img.jpg'}
            alt="login"
            width={500}
            height={500}
            className="w-full h-full"
          />
        </div>

        <Sign actionUser={isViewFormLogin ? 'login' : 'create'} />
      </div>
    </div>
  );
}
