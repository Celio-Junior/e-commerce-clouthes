import HeaderAdmin from '@/components/admin/Header/Index';
import { headers } from 'next/headers';
type RootAdminProps = Readonly<{
  children: React.ReactNode;
}>;
export default async function RootAdmin({ children }: RootAdminProps) {
  const isNavUrl = (await headers()).get('x-path');

  return (
    <>
      {!isNavUrl?.includes('z_admin/auth') && <HeaderAdmin />}
      {children}
    </>
  );
}
