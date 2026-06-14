'use client';
import { useRef, useTransition } from 'react';

import { toast } from 'react-toastify';

import { useRouter } from 'next/navigation';

import Input from '@/components/Input';
import Button from '@/components/Button';
import { SizePublicType } from '@/interfaces/Size.interface';
import SizeCreateAction from '@/actions/size/create.action';
import sizeUpdateAction from '@/actions/size/update.action';

type FormBillboardProps = {
  method: 'create' | 'update';
  size?: Omit<SizePublicType, 'createdAt'>;
};

export default function FormSize({ method, size }: FormBillboardProps) {
  const router = useRouter();

  const nameText = useRef<HTMLInputElement>(null);
  const valueText = useRef<HTMLInputElement>(null);
  const [isTransitionSize, startTransitionBillboard] = useTransition();
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.target;
    if (!(form instanceof HTMLFormElement)) return;

    startTransitionBillboard(async () => {
      const data: Omit<SizePublicType, 'createdAt'> = {
        id: size?.id ?? '',
        name: nameText.current?.value ?? '',
        value: valueText.current?.value ?? '',
      };

      const sizeResponse = await (method === 'create' ? SizeCreateAction(data) : sizeUpdateAction(data));

      if (!sizeResponse.success && sizeResponse.errors.length > 0)
        return sizeResponse.errors.forEach((err) => toast.error(err, { toastId: err }));

      if (sizeResponse.success) {
        toast.success(method === 'create' ? 'Size create with success' : 'Size edit with success', {
          toastId: `success size ${method === 'create' ? 'create' : 'edit'}`,
        });

        if (method === 'create') router.push('/z_admin/sizes');
      }
    });
  }
  return (
    <form onSubmit={handleSubmit} className="shadow-sm shadow-gray-100 px-1 py-3 rounded-2xl" action="">
      <fieldset className="flex justify-star gap-5 w-full">
        <Input
          ref={nameText}
          disabled={isTransitionSize}
          name="name"
          className="border border-gray-200 outline-0 focus:outline-1 w-100"
          placeholder="billboard label"
          defaultValue={method === 'update' && size ? size.name : ''}
        >
          Name
        </Input>
        <Input
          ref={valueText}
          disabled={isTransitionSize}
          name="value"
          className="border border-gray-200 outline-0 focus:outline-1 w-100"
          placeholder="billboard label"
          defaultValue={method === 'update' && size ? size.value : ''}
        >
          Value
        </Input>
      </fieldset>
      <Button disabled={isTransitionSize} className="my-3 px-5 py-3">
        {method === 'create' ? 'Create' : 'Update'}
      </Button>
    </form>
  );
}
