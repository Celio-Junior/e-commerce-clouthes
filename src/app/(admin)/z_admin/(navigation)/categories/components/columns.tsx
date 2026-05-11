import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
export type BillBoardColumn = {
  id: string;
  label: string;
  createdAt: Date;
};

export const columns: ColumnDef<BillBoardColumn>[] = [
  {
    accessorKey: 'label',
    header: 'Label',
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
