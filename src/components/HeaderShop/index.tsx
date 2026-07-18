'use client';
import { CircleUserRoundIcon, ShoppingBagIcon } from 'lucide-react';
import Link from 'next/link';

import UserSign from '../UserSign';

import { useContextViewFormUser } from '@/context/ViewFormUser/useContext';
import { useEffect, useState } from 'react';
import { verifyLoginSession } from '@/lib/login/manage-user';
import { cn } from '@/utils/formats-functions';

type HeaderShopProps = {
  categories: string[];
};

export default function HeaderShop({ categories }: HeaderShopProps) {
  const [{ viewForm, setSignUser }] = useContextViewFormUser();
  const [sign, setIsSign] = useState<boolean>(false);
  useEffect(() => {
    (async () => {
      const isLogin = await verifyLoginSession('user');
      setIsSign(() => !!isLogin);
    })();
  }, [viewForm]);

  return (
    <header
      style={{ boxShadow: '1px 0px 2px #eee' }}
      className={cn('flex justify-between', 'max-w-[90%] mx-auto p-6 relative')}
    >
      <div className="flex gap-8 items-center">
        <h1 className="text-3xl font-bold">
          {/* NEXA */}
          <Link href={'/'}>Store</Link>
        </h1>
        <nav>
          <ul className="flex gap-4 text-gray-600">
            {categories.map((category) => (
              <li key={crypto.randomUUID()}>
                <Link href={`/${category}`}>{category}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="flex gap-3 items-center">
        <button
          onClick={() => setSignUser(() => true)}
          type="button"
          title="create/login User"
          className="cursor-pointer transition-all hover:scale-105 relative"
        >
          {!sign ? (
            <>
              <CircleUserRoundIcon size={30} />
              <span className="absolute -top-1 text-sm rounded-4xl bg-gray-900 text-gray-100 opacity-90 px-2">
                ?
              </span>
            </>
          ) : (
            <CircleUserRoundIcon size={30} />
          )}
        </button>

        <div className="flex gap-2 items-center bg-gray-950 px-3 py-2 rounded-2xl cursor-pointer">
          <button
            type="button"
            title="cart"
            className="text-gray-50 cursor-pointer transition-all hover:scale-105"
          >
            <ShoppingBagIcon />
          </button>
          <span className="text-gray-50  font-semibold">0</span>
        </div>
      </div>

      {!!viewForm && <UserSign />}
    </header>
  );
}
