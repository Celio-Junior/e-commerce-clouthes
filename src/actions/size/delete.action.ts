'use server';

import { EXPIRE_TAG_BILLBOARDS } from '@/lib/constants';

import { categoryRepository } from '@/repository/category';
import { revalidateTag } from 'next/cache';

type BillboardDeleteActionType = {
  id: string;
};

export default async function sizeDeleteAction(data: BillboardDeleteActionType) {
  const { id } = data;

  try {
    await categoryRepository.remove(id);
    revalidateTag('categorys', { expire: EXPIRE_TAG_BILLBOARDS });
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
