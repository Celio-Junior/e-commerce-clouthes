import HeaderAdmin from '@/components/admin/Header/Index';
import { headers } from 'next/headers';
import { Suspense } from 'react';
type RootAdminProps = Readonly<{
  children: React.ReactNode;
}>;

export default async function RootAdmin({ children }: RootAdminProps) {
  // const isNavUrl = (await headers()).get('x-path-admin');

  return (
    <>
      {/* {!isNavUrl?.includes('z_admin/auth') ? <HeaderAdmin /> : null} */}
      <Suspense>
        <HeaderAdminLogic />
      </Suspense>
      {children}
    </>
  );
}

async function HeaderAdminLogic() {
  const isNavUrl = (await headers()).get('x-path-admin');
  return !isNavUrl?.includes('z_admin/auth') ? <HeaderAdmin /> : null;
}
