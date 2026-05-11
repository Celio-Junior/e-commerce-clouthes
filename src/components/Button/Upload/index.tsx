'use client';
import { CldUploadWidget } from 'next-cloudinary';
import Button from '..';
import { ImagePlusIcon } from 'lucide-react';

type ButtonUploadProps = {
  onUploadAction: (url: string, id: string) => void;
};

export default function ButtonUpload({ onUploadAction }: ButtonUploadProps) {
  return (
    <CldUploadWidget
      onSuccess={(result) => {
        console.log(result.info);
        if (!result.info || typeof result.info === 'string') return;
        onUploadAction(result.info.secure_url, result.info.public_id);
      }}
      uploadPreset="clouth-teste"
    >
      {({ open }) => {
        return (
          <Button
            type="button"
            className="my-5 border-0 hover:bg-gray-400/40"
            size="xl"
            onClick={() => open()}
            variant="customize"
          >
            <ImagePlusIcon /> Upload an image
          </Button>
        );
      }}
    </CldUploadWidget>
  );
}
