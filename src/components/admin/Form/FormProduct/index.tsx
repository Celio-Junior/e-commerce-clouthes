'use client';
import { useState, useTransition } from 'react';

import { toast } from 'react-toastify';

import { useRouter } from 'next/navigation';

import Input from '@/components/Input';
import Button from '@/components/Button';

import { ImageProductPublicType, ProductPublicType } from '@/interfaces/Product..interface';
import { InputSelect } from '@/components/Input/InputSelect';
import { ProductPublicDto } from '@/dto/Product.dto';
import { CategoryPublicType } from '@/interfaces/Category.interface';
import { SizePublicType } from '@/interfaces/Size.interface';
import { ColorPublicType } from '@/interfaces/Color.interface';
import productCreateAction from '@/actions/product/create.action';
import productUpdateAction from '@/actions/product/update.action';
import ImageUpload from '@/components/ImageUpload';
import { ImagesBillboardType } from '../FormBillboard';
import { productImageDeleteAction } from '@/actions/product/delete.action';

type FormProductProps = {
  method: 'create' | 'update';
  categories: CategoryPublicType[];
  sizes: SizePublicType[];
  colors: ColorPublicType[];
  product?: ProductPublicType & { images: ImageProductPublicType[] };
};
// BUG tipo, vai term products que não ver ter certo propriedades, como size, color e etc, consertar isso

export default function FormProduct({ method, product, categories, colors, sizes }: FormProductProps) {
  const router = useRouter();

  const [showImagesUrl, setShowImagesUrl] = useState<ImagesBillboardType[]>(
    !product
      ? []
      : product.images.map(({ id, url, product_id }) => {
          if (product && product.id === product_id) return { isActive: true, url, id };
          return { isActive: false, url, id };
        }),
  );
  const [isTransitionProduct, startTransitionProduct] = useTransition();
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.target;
    if (!(form instanceof HTMLFormElement)) return;

    const imageProduct = showImagesUrl.find((imgProduct) => imgProduct.isActive);
    if (!imageProduct) return toast.error('Please select an image', { toastId: 'error image' });
    //TODO fazer a validação do dto, servi pra todos
    const data = ProductPublicDto.parse({
      ...Object.fromEntries(new FormData(form)),
      id_image: imageProduct.id,
      image_url: imageProduct.url,
    });
    startTransitionProduct(async () => {
      const colorResponse = await (method === 'create'
        ? productCreateAction(data)
        : productUpdateAction({ id: product?.id ?? '', ...data }));

      if (!colorResponse.success && colorResponse.errors.length > 0)
        return colorResponse.errors.forEach((err) => toast.error(err, { toastId: err }));

      if (colorResponse.success) {
        toast.success(method === 'create' ? 'Product created' : 'Product edit', {
          toastId: `success color ${method === 'create' ? 'create' : 'edit'}`,
        });

        if (method === 'create') {
          router.push('/z_admin/products');
          e.currentTarget.reset(); // Limpa o formulário após enviar
        }
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="shadow-sm shadow-gray-100 px-1 py-3 rounded-2xl" action="">
      <fieldset className="flex flex-wrap justify-star gap-5 w-full">
        <div className="w-full">
          <ImageUpload
            handleDelete={productImageDeleteAction}
            labelText={'images'}
            showImagesUrl={showImagesUrl}
            setShowImagesUrl={setShowImagesUrl}
          />
        </div>
        <Input
          disabled={isTransitionProduct}
          name="name"
          className="border border-gray-200 outline-0 focus:outline-1 w-80"
          placeholder="name is product"
          defaultValue={method === 'update' && product ? product.name : ''}
        >
          Name
        </Input>
        <Input
          disabled={isTransitionProduct}
          name="price"
          type="number"
          className="border border-gray-200 outline-0 focus:outline-1 w-80"
          placeholder="exe: 49.99"
          defaultValue={method === 'update' && product ? product.price.toFixed(2) : ''}
        >
          Price
        </Input>

        <InputSelect
          name="category_id"
          keySelect="name"
          placeholder="select category"
          data={categories}
          disabled={isTransitionProduct}
          defaultValue={product?.category}
        >
          Category
        </InputSelect>

        <InputSelect
          keySelect="name"
          name="size_id"
          placeholder="select size"
          data={sizes}
          disabled={isTransitionProduct}
          defaultValue={product?.size}
        >
          Size
        </InputSelect>

        <InputSelect
          keySelect="name"
          name="color_id"
          placeholder="select color"
          data={colors}
          disabled={isTransitionProduct}
          defaultValue={product?.color}
        >
          Color
        </InputSelect>
      </fieldset>
      <Button disabled={isTransitionProduct} className="my-3 px-5 py-3">
        {method === 'create' ? 'Create' : 'Update'}
      </Button>
    </form>
  );
}
