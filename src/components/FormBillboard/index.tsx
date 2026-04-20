'use client';
import { useRef, useState, useTransition } from 'react';
import Button from '../Button';

import ImageUpload from '../ImageUpload';
import Input from '../Input';

import { toast } from 'react-toastify';

import billboardAction from '@/actions/billboard/billboard.action';

//acho que vou colocar id

export type ImagesBillboardType = {
  url: string;
  isActive: boolean;
};

type FormBillboardProps = {
  billboardsImgs: string[];
};

export default function FormBillboard({ billboardsImgs }: FormBillboardProps) {
  const [showImagesUrl, setShowImagesUrl] = useState<ImagesBillboardType[]>(
    billboardsImgs.map((url) => ({ isActive: false, url })),
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

    const data = { image_url: imageUrl.url, label: labelText.current?.value ?? '' };

    startTransitionBillboard(async () => {
      const { errors, success } = await billboardAction(data);
      if (!success && errors.length > 0) return errors.forEach((err) => toast.error(err, { toastId: err }));

      if (success) toast.success('Billboard create with success', { toastId: 'success billboard created' });
    });
  }
  return (
    <form onSubmit={handleSubmit} className="shadow-sm shadow-gray-300 px-1 py-3 rounded-2xl" action="">
      <ImageUpload showImagesUrl={showImagesUrl} setShowImagesUrl={setShowImagesUrl} />

      <Input
        ref={labelText}
        disabled={isTransitionBillboard}
        name="label"
        className="border border-gray-200 outline-0 focus:outline-1 "
        placeholder="billboard label"
      >
        Label
      </Input>
      <Button disabled={isTransitionBillboard} className="my-3">
        Create
      </Button>
    </form>
  );
}
