'use server';

import { ProductActionType } from '@/interfaces/Product..interface';

import { EXPIRE_TAG_CACHE } from '@/lib/constants';
import { ProductUpdateFormSchema, ProductUpdateFormType } from '@/lib/validations/product';

import { productRepository } from '@/repository/product';

import { formatZodMessage } from '@/utils/formats-functions';
import { revalidateTag } from 'next/cache';

export default async function productUpdateAction(data: ProductUpdateFormType): Promise<ProductActionType> {
  const validSizeForm = ProductUpdateFormSchema.safeParse(data);

  if (!validSizeForm.success) {
    return {
      errors: formatZodMessage(validSizeForm.error),
      success: false,
    };
  }
  try {
    const sizeData = validSizeForm.data;
    await productRepository.update(sizeData.id, sizeData);

    revalidateTag('products', { expire: EXPIRE_TAG_CACHE });
    return {
      success: true,
      data: 'ok',
    };
  } catch (e) {
    if (e instanceof Error) {
      return {
        errors: [e.message],
        success: false,
      };
    }
    return {
      errors: ['error na database'],
      success: false,
    };
  }
}
