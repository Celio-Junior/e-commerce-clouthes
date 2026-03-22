import clsx from 'clsx';

export default function HeaderAdmin() {
  return (
    <div className={clsx('flex justify-between items-center', 'px-10 my-15 w-full gap-2 ')}>
      <h1 className="text-3xl" title="titulo/logo">
        NEXA admin
      </h1>
      <nav
        className={clsx(
          'flex gap-2 text-gray-500 text-lg',
          '[&>span]:cursor-pointer [&>span]:font-medium [&>span]:hover:text-gray-800 [&>span]:transition [&>span]:hover:scale-105',
        )}
      >
        <span>overview</span>
        <span>billboards</span>
        <span>categories</span>
        <span>settings</span>
      </nav>
      <div>User😎</div>
    </div>
  );
}
