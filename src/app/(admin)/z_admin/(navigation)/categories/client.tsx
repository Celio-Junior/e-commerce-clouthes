'use client';
import Button from '@/components/Button';
import SubTitle from '@/components/Subtitle';
import { DataTable } from '@/components/ui/data-table';

import { PlusIcon } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { CategoryColumn, columns } from './components/columns';

type CategoryClientProps = {
  data: CategoryColumn[];
};
export default function CategoryClient({ data }: CategoryClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div>
      <div className="py-6 px-2 flex justify-between items-center  shadow-[0px_2px_3px_#dde] my-5">
        <SubTitle title={`Categories (${data.length})`} description={'Manage categories for you store'} />

        <Button onClick={() => router.push(`${pathname}/new`)} size="xl" variant="default">
          {'  '}
          <PlusIcon className="mr-2" /> Add New
        </Button>
      </div>
      <DataTable searchKey="label" columns={columns} data={data} />
    </div>
  );
}
