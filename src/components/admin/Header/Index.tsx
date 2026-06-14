import clsx from 'clsx';
import NavigationAdmin from './Navigation';

export default function HeaderAdmin() {
  return (
    <div className={clsx('flex justify-between items-center', 'px-10 my-12 w-full gap-2 ')}>
      <h1 className="text-3xl" title="titulo/logo">
        NEXA admin
      </h1>
      <NavigationAdmin linkNavigation={['overview', 'billboards', 'categories', 'sizes', 'settings']} />
      <div>User😎</div>
    </div>
  );
}
