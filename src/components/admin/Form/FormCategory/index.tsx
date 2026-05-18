'use client';
import { useRef } from 'react';

import Input from '@/components/Input';
import Button from '@/components/Button';
import { InputSelect } from '@/components/Input/InputSelect';
import { BillboardModelType } from '@/interfaces/Billboard.interface';

//acho que vou colocar id

export type ImagesBillboardType = {
  id: string;
  url: string;
  isActive: boolean;
};

type FormCategoryProps = {
  method: 'create' | 'update';
  billboards: BillboardModelType[];
};

export default function FormCategory({ method, billboards }: FormCategoryProps) {
  const labelText = useRef<HTMLInputElement>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.target;
    if (!(form instanceof HTMLFormElement)) return;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="shadow-sm shadow-gray-100 px-1 py-3 rounded-2xl w-full"
      action=""
    >
      <fieldset className="flex justify-star gap-5 w-full">
        <Input
          ref={labelText}
          name="label"
          className="border border-gray-200 outline-0 focus:outline w-100"
          placeholder="Category name"
          defaultValue={method === 'update' ? '' : ''}
        >
          Label
        </Input>

        <InputSelect className="w-100" data={billboards}>
          Billboard
        </InputSelect>
      </fieldset>
      <Button className="my-3">{method === 'create' ? 'Create' : 'Update'}</Button>
    </form>
  );
}
