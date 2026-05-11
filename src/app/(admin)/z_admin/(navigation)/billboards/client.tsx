'use client';
import Button from '@/components/Button';
import SubTitle from '@/components/Subtitle';
import { DataTable } from '@/components/ui/data-table';

import { PlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { BillBoardColumn, columns } from './components/columns';

type BillboardClientProps = {
  data: BillBoardColumn[];
};
export default function BillboardClient({ data }: BillboardClientProps) {
  const router = useRouter();
  return (
    <div>
      <div className="py-6 px-2 flex justify-between items-center  shadow-[0px_2px_3px_#dde] my-5">
        <SubTitle title={`Billboards (${data.length})`} description={'Manage Billboards for you store'} />

        <Button onClick={() => router.push('/z_admin/billboards/new')} size="xl" variant="default">
          {'  '}
          <PlusIcon className="mr-2" /> Add New
        </Button>
      </div>
      <DataTable searchKey="label" columns={columns} data={data} />
    </div>
  );
}
