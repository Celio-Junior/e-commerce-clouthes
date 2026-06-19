'use client';
import { useRef, useState, useTransition } from 'react';

import { toast } from 'react-toastify';

import { useRouter } from 'next/navigation';

import Input from '@/components/Input';
import Button from '@/components/Button';
import { ColorPublicType } from '@/interfaces/Color.interface';
import colorCreateAction from '@/actions/color/create.action';
import colorUpdateAction from '@/actions/color/update.action';
import { isValidColor } from '@/utils/validColors';

type FormColorProps = {
  method: 'create' | 'update';
  color?: Omit<ColorPublicType, 'createdAt'>;
};

export default function FormColor({ method, color }: FormColorProps) {
  const router = useRouter();

  const nameText = useRef<HTMLInputElement>(null);
  const [valueColorText, setValueColorText] = useState<string>(color?.value ?? '');
  const [valueColor, setValueColor] = useState<string>(color?.value ?? '#000000');

  const [isTransitionColor, startTransitionBillboard] = useTransition();
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.target;
    if (!(form instanceof HTMLFormElement)) return;

    startTransitionBillboard(async () => {
      const data: Omit<ColorPublicType, 'createdAt'> = {
        id: color?.id ?? '',
        name: nameText.current?.value ?? '',
        value: valueColor,
      };

      const colorResponse = await (method === 'create' ? colorCreateAction(data) : colorUpdateAction(data));

      if (!colorResponse.success && colorResponse.errors.length > 0)
        return colorResponse.errors.forEach((err) => toast.error(err, { toastId: err }));

      if (colorResponse.success) {
        toast.success(method === 'create' ? 'Color create with success' : 'Color edit with success', {
          toastId: `success color ${method === 'create' ? 'create' : 'edit'}`,
        });

        if (method === 'create') router.push('/z_admin/colors');
      }
    });
    e.currentTarget.reset(); // Limpa o formulário após enviar
  }
  return (
    <form onSubmit={handleSubmit} className="shadow-sm shadow-gray-100 px-1 py-3 rounded-2xl" action="">
      <fieldset className="flex justify-star gap-5 w-full">
        <Input
          ref={nameText}
          disabled={isTransitionColor}
          name="name"
          className="border border-gray-200 outline-0 focus:outline-1 w-100"
          placeholder="name color"
          defaultValue={method === 'update' && color ? color.name : ''}
        >
          Name
        </Input>
        <div className="gap-2 flex items-end">
          <Input
            onChange={(e) => {
              let value = e.target.value;
              if (!value.startsWith('#') && value.length !== 0) value = '#' + value;
              if (value.length > 7) value = value.slice(0, 7);

              if (isValidColor(value)) setValueColor(value);
              setValueColorText(value);
            }}
            value={valueColorText}
            disabled={isTransitionColor}
            name="value"
            className="border border-gray-200 outline-0 focus:outline-1 w-100"
            placeholder="value color"
            // defaultValue={method === 'update' && color ? color.value : ''}
          >
            Value
          </Input>

          <input
            maxLength={7}
            onChange={(e) => {
              setValueColor(e.target.value);
              setValueColorText(e.target.value);
            }}
            type="color"
            value={valueColor}
            className="w-9 outline-0 h-10 border-0 cursor-pointer"
          />
        </div>
      </fieldset>
      <Button disabled={isTransitionColor} className="my-3 px-5 py-3">
        {method === 'create' ? 'Create' : 'Update'}
      </Button>
    </form>
  );
}
