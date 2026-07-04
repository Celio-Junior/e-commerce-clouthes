'use server';

import { EXPIRE_TAG_BILLBOARDS } from '@/lib/constants';

import { productRepository } from '@/repository/product';
import { revalidateTag } from 'next/cache';

type BillboardDeleteActionType = {
  id: string;
};

export default async function productDeleteAction(data: BillboardDeleteActionType) {
  const { id } = data;

  try {
    await productRepository.remove(id);
    revalidateTag('products', { expire: EXPIRE_TAG_BILLBOARDS });
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

export async function productImageDeleteAction(id: string) {
  try {
    await productRepository.removeImages(id);
  } catch (e) {
    // if (e instanceof Error) {
    //   return {
    //     errors: [e.message],
    //     success: false,
    //   };
    // }
    // return {
    //   errors: ['error na database'],
    //   success: false,
    // };
  }
}
