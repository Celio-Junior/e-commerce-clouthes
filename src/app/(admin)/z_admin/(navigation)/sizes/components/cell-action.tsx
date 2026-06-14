'use client';
import { EditIcon, MoreHorizontal, TrashIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  // DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import React from 'react';
import { useRouter } from 'next/navigation';

import { ModelDialog } from '@/components/AlertDialog';

import sizeDeleteAction from '@/actions/size/delete.action';
import { SizeColumn } from './columns';

type CellActionProps = {
  data: SizeColumn;
};

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(data.id)}>Copy ID</DropdownMenuItem>
        {/* <DropdownMenuSeparator /> */}
        <DropdownMenuItem onClick={() => router.push(`/z_admin/sizes/edit/${data.id}`)}>
          <EditIcon />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem>
          <ModelDialog
            title="Delete billboard"
            description="Are you sure you want to delete this billboard?"
            onConfirm={() => {
              sizeDeleteAction({ id: data.id });
              router.refresh();
            }}
          >
            <TrashIcon />
            Delete
          </ModelDialog>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
