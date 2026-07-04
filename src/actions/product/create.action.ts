'use server';

import { ProductActionType } from '@/interfaces/Product..interface';

import { EXPIRE_TAG_BILLBOARDS } from '@/lib/constants';
import { ProductCreateFormSchema, ProductCreateFormType } from '@/lib/validations/product';

import { productRepository } from '@/repository/product';

import { formatZodMessage } from '@/utils/formats-functions';
import { revalidateTag } from 'next/cache';

export default async function productCreateAction(data: ProductCreateFormType): Promise<ProductActionType> {
  const validProductForm = ProductCreateFormSchema.safeParse(data);

  if (!validProductForm.success) {
    return {
      errors: formatZodMessage(validProductForm.error),
      success: false,
    };
  }

  try {
    await productRepository.create(validProductForm.data);

    revalidateTag('products', { expire: EXPIRE_TAG_BILLBOARDS });
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
