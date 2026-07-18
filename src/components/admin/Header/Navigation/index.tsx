'use client';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavigationAdmin({ linkNavigation }: { linkNavigation: string[] }) {
  const pathname = usePathname();

  return (
    <nav
      className={clsx(
        'flex gap-2 text-gray-500 text-lg',

        // '[&>a]:cursor-pointer [&>a]:font-medium [&>a]:hover:text-gray-800 [&>a]:transition [&>a]:hover:scale-105',
      )}
    >
      {linkNavigation.map((linkText) => {
        return (
          <Link
            className={clsx(
              'cursor-pointer font-medium ',
              ' hover:text-gray-700',
              pathname.includes(`/${linkText}`) && 'scale-130 text-gray-800 mx-3',
            )}
            key={crypto.randomUUID()}
            href={`/z_admin/${linkText.match('overview') ? '' : linkText}`}
          >
            {linkText}
          </Link>
        );
      })}
    </nav>
  );
}
