import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
export type CategoryColumn = {
  id: string;
  label: string;
  billboard: string;
  createdAt: Date;
};

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: 'label',
    header: 'Name',
  },
  {
    accessorKey: 'billboard',
    header: 'Billboard',
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
    cell: ({ row }) =>
      new Date(row.original.createdAt).toLocaleString('en-US', {
        dateStyle: 'long',
        hour12: true,
        timeStyle: 'medium',
      }),
  },
  { id: 'actions', cell: ({ row }) => <CellAction data={row.original} /> },
];
