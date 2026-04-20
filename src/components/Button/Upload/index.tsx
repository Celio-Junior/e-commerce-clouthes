'use client';
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from 'next-cloudinary';
import Button from '..';
import { ImagePlusIcon } from 'lucide-react';

type ButtonUploadProps = {
  onUpload: (url: string) => void;
};

export default function ButtonUpload({ onUpload }: ButtonUploadProps) {
  return (
    <CldUploadWidget
      onSuccess={(result) => {
        onUpload((result.info as CloudinaryUploadWidgetInfo)?.secure_url);
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
