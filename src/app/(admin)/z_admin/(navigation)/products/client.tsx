'use client';
import Button from '@/components/Button';
import SubTitle from '@/components/Subtitle';
import { DataTable } from '@/components/ui/data-table';

import { PlusIcon } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { columns, SizeColumn } from './components/columns';

type ProductClientProps = {
  data: SizeColumn[];
};
export default function ProductClient({ data }: ProductClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div>
      <div className="py-6 px-2 flex justify-between items-center  shadow-[0px_2px_3px_#dde] my-5">
        <SubTitle title={`Products (${data.length})`} description={'Manage products for you store'} />

        <Button onClick={() => router.push(`${pathname}/new`)} size="xl" variant="default">
          {'  '}
          <PlusIcon className="mr-2" /> Add New
        </Button>
      </div>
      <DataTable searchKey="name" columns={columns} data={data} />
    </div>
  );
}
