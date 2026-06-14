import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
export type SizeColumn = {
  id: string;
  name: string;
  value: string;
  createdAt: Date;
};

export const columns: ColumnDef<SizeColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'value',
    header: 'Value',
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
