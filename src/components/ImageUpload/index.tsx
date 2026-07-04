'use client';

import ButtonUpload from '../Button/Upload';
import Image from 'next/image';
import { TrashIcon } from 'lucide-react';
import { cn } from '@/utils/formats-functions';
import { ImagesBillboardType } from '../admin/Form/FormBillboard';
import { ModelDialog } from '../AlertDialog';

type ImageUploadProps = {
  showImagesUrl: ImagesBillboardType[];
  setShowImagesUrl: React.Dispatch<React.SetStateAction<ImagesBillboardType[]>>;
  labelText: React.ReactNode;
  handleDelete(id: string): Promise<void>;
};
const ImageUpload = ({ setShowImagesUrl, showImagesUrl, labelText, handleDelete }: ImageUploadProps) => {
  const handleUpload = (newUrl: string, id: string) => {
    setShowImagesUrl((prevImages) => [
      ...prevImages.map((image) => ({
        ...image,
        isActive: false,
      })),
      { url: newUrl, isActive: true, id },
    ]);
  };

  const handleClickImageActive = (isActive: boolean, index: number) => {
    if (isActive) return;

    setShowImagesUrl((prevImagesUrl) => {
      return prevImagesUrl.map((imageUrl, i) => {
        if (i === index) {
          return { ...imageUrl, isActive: true };
        }
        return { ...imageUrl, isActive: false };
      });
    });
  };
  return (
    <div className="my-5">
      <label className="capitalize text-lg text-gray-800 font-semibold" htmlFor="background image">
        {labelText}
      </label>
      {showImagesUrl.length > 0 && (
        <div className="mt-4 flex gap-5">
          {showImagesUrl.map(({ url, isActive, id }, index) => (
            <div
              onClick={() => handleClickImageActive(isActive, index)}
              key={index}
              className={cn(
                'w-[250] h-[250]',
                'rounded-2xl overflow-hidden',
                'hover:scale-105 transition relative',
                'border-4 border-transparent hover:border-2 hover:border-gray-900',
                isActive && 'border-blue-500',
              )}
            >
              <span className="absolute z-10 top-2 right-2 cursor-pointer transition bg-red-500/80 hover:bg-red-500 rounded p-2">
                <ModelDialog
                  title="Delete image"
                  description="Are you sure you want to delete this image?"
                  onConfirm={async () => {
                    await handleDelete(id);
                    setShowImagesUrl((images) => images.filter((img) => img.id !== id));
                  }}
                >
                  <TrashIcon />
                </ModelDialog>
              </span>
              <Image className="object-cover" fill src={url} alt="teste billboard" />
            </div>
          ))}
        </div>
      )}

      <ButtonUpload onUploadAction={handleUpload} />
    </div>
  );
};

export default ImageUpload;
