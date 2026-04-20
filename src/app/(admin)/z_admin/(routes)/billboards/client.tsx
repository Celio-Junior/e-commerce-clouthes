'use client';
import Button from '@/components/Button';
import SubTitle from '@/components/Subtitle';
import { PlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function BillboardClient() {
  const router = useRouter();
  return (
    <div className="flex justify-between items-center">
      <SubTitle title={`Billboards (${0})`} description={'Manage Billboards for you store'} />

      <Button onClick={() => router.push('/z_admin/billboards/new')} size="xl" variant="default">
        {'  '}
        <PlusIcon className="mr-2" /> Add New
      </Button>
    </div>
  );
}
