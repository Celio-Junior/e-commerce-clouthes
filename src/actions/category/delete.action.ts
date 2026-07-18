'use server';

import { EXPIRE_TAG_CACHE } from '@/lib/constants';

import { categoryRepository } from '@/repository/category';
import { revalidateTag } from 'next/cache';

type BillboardDeleteActionType = {
  id: string;
};

export default async function categoryDeleteAction(data: BillboardDeleteActionType) {
  const { id } = data;

  try {
    await categoryRepository.remove(id);
    revalidateTag('categorys', { expire: EXPIRE_TAG_CACHE });
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
