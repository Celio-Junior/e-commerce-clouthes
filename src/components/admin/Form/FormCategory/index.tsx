'use client';
import { useRef, useTransition } from 'react';

import Input from '@/components/Input';
import Button from '@/components/Button';
import { InputSelect } from '@/components/Input/InputSelect';
import { BillboardModelType } from '@/interfaces/Billboard.interface';

import categoryCreateAction from '@/actions/category/create.action';
import categoryUpdateAction from '@/actions/category/update.action';
import { toast } from 'react-toastify';

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
  const nameCategoryInput = useRef<HTMLInputElement>(null);
  const billboardIdInput = useRef<string>('');
  console.log(billboards);
  const [isTransitionCategory, startTransitionCategory] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.target;
    if (!(form instanceof HTMLFormElement)) return;

    const data = {
      name: nameCategoryInput.current?.value ?? '',
      billboard_id: billboardIdInput.current,
    };

    startTransitionCategory(async () => {
      const categoryResponse = await (method === 'create'
        ? categoryCreateAction(data)
        : categoryUpdateAction(data));

      if (!categoryResponse.success && categoryResponse.errors.length > 0)
        return categoryResponse.errors.forEach((err) => toast.error(err, { toastId: err }));

      if (categoryResponse.success) {
        toast.success(method === 'create' ? 'Category create with success' : 'Category edited', {
          toastId: `success category ${method === 'create' ? 'create' : 'edit'}`,
        });
      }
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="shadow-sm shadow-gray-100 px-1 py-3 rounded-2xl w-full"
      action=""
    >
      <fieldset className="flex justify-star gap-5 w-full">
        <Input
          ref={nameCategoryInput}
          disabled={isTransitionCategory}
          name="nameCategory"
          className="border border-gray-200 outline-0 focus:outline w-100"
          placeholder="Category name"
          defaultValue={method === 'update' ? '' : ''}
        >
          Label
        </Input>

        <InputSelect
          inputRef={billboardIdInput}
          className="w-100"
          placeholder="select billboard"
          data={billboards}
          disabled={isTransitionCategory}
        >
          Billboard
        </InputSelect>
      </fieldset>
      <Button className="my-3 py-3 px-5">{method === 'create' ? 'Create' : 'Update'}</Button>
    </form>
  );
}
