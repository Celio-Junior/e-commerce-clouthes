import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
export type SizeColumn = {
  id: string;
  name: string;
  price: number;
  category: string;
  size: string;
  color: string;
  createdAt: Date;
};

export const columns: ColumnDef<SizeColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({ row }) => `$${row.original.price.toFixed(2)}`,
  },
  {
    accessorKey: 'category',
    header: 'Category',
  },
  {
    accessorKey: 'size',
    header: 'Size',
  },
  {
    accessorKey: 'color',
    header: 'Color',
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
