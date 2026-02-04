import { ShoppingBagIcon } from 'lucide-react';
import Link from 'next/link';

export default function HeaderShop() {
  return (
    <header className="flex justify-between max-w-[90%] mx-auto p-6">
      <div className="flex gap-8 items-center">
        <h1 className="text-3xl font-bold">
          <Link href={'/'}>Loja</Link>
        </h1>
        <nav>
          <ul className="flex gap-4 text-gray-600">navigation&apos;s</ul>
        </nav>
      </div>
      <div className="flex gap-2 items-center bg-gray-950 px-3 py-2 rounded-2xl cursor-pointer">
        <button type="button" title="cart" className="text-gray-50">
          <ShoppingBagIcon />
        </button>
        <span className="text-gray-50">0</span>
      </div>
    </header>
  );
}
