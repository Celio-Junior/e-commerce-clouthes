'use client';
import { useRef, useState, useTransition } from 'react';
import Button from '../../Button';

import ImageUpload from '../../ImageUpload';
import Input from '../../Input';

import { toast } from 'react-toastify';

import billboardCreateAction from '@/actions/billboard/create.action';
import { BillboardModelType } from '@/interfaces/Billboard.interface';
import billboardUpdateAction from '@/actions/billboard/update.action';
import { useRouter } from 'next/navigation';

//acho que vou colocar id

export type ImagesBillboardType = {
  id: string;
  url: string;
  isActive: boolean;
};

type FormBillboardProps = {
  billboardsImgs: Omit<ImagesBillboardType, 'isActive'>[];
  method: 'create' | 'update';
  billboard?: Omit<BillboardModelType, 'createdAt' | 'updatedAt'>;
};

export default function FormBillboard({ billboardsImgs, method, billboard }: FormBillboardProps) {
  const router = useRouter();
  const [showImagesUrl, setShowImagesUrl] = useState<ImagesBillboardType[]>(
    billboardsImgs.map(({ id, url }) => {
      if (billboard && billboard.image_id === id) return { isActive: true, url, id };
      return { isActive: false, url, id };
    }),
  );
  const labelText = useRef<HTMLInputElement>(null);
  const [isTransitionBillboard, startTransitionBillboard] = useTransition();
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.target;
    if (!(form instanceof HTMLFormElement)) return;

    const imageUrl = showImagesUrl.find((image) => {
      return image.isActive;
    });

    if (!imageUrl) return toast.error('Please select an image', { toastId: 'error image' });

    startTransitionBillboard(async () => {
      const data = {
        image_url: imageUrl.url,
        label: labelText.current?.value ?? '',
        image_id: imageUrl.id,
      };

      const billboardResponse = await (method === 'create'
        ? billboardCreateAction(data)
        : billboardUpdateAction({ ...data, id: billboard?.id ?? '' }));

      if (!billboardResponse.success && billboardResponse.errors.length > 0)
        return billboardResponse.errors.forEach((err) => toast.error(err, { toastId: err }));

      if (billboardResponse.success) {
        toast.success(method === 'create' ? 'Billboard create with success' : 'Billboard edit with success', {
          toastId: `success billboard ${method === 'create' ? 'create' : 'edit'}`,
        });
        setShowImagesUrl((imgSelect) => {
          imgSelect[imgSelect.length - 1].id = billboardResponse.data;
          return imgSelect;
        });
        if (method === 'create') router.push('/z_admin/billboards');
      }
    });
  }
  return (
    <form onSubmit={handleSubmit} className="shadow-sm shadow-gray-100 px-1 py-3 rounded-2xl" action="">
      <ImageUpload showImagesUrl={showImagesUrl} setShowImagesUrl={setShowImagesUrl} />

      <Input
        ref={labelText}
        disabled={isTransitionBillboard}
        name="label"
        className="border border-gray-200 outline-0 focus:outline-1 "
        placeholder="billboard label"
        defaultValue={method === 'update' ? billboard?.label : ''}
      >
        Label
      </Input>
      <Button disabled={isTransitionBillboard} className="my-3">
        {method === 'create' ? 'Create' : 'Update'}
      </Button>
    </form>
  );
}
