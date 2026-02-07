'use client';
import { CircleUserRoundIcon, ShoppingBagIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import UserSign from '../UserSign';

export default function HeaderShop() {
  const [signUser, setSignUser] = useState(true);

  const handleCloseSign = () => setSignUser(() => false);

  return (
    <header className="flex justify-between max-w-[90%] mx-auto p-6 relative">
      <div className="flex gap-8 items-center">
        <h1 className="text-3xl font-bold">
          {/* NEXA */}
          <Link href={'/'}>Store</Link>
        </h1>
        <nav>
          <ul className="flex gap-4 text-gray-600">navigation&apos;s</ul>
        </nav>
      </div>

      <div className="flex gap-3 items-center">
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

        <button
          onClick={() => setSignUser(() => true)}
          type="button"
          title="create/login User"
          className="cursor-pointer transition-all hover:scale-105"
        >
          <CircleUserRoundIcon size={30} />
        </button>
      </div>

      {!!signUser && <UserSign closeSign={handleCloseSign} />}
    </header>
  );
}
