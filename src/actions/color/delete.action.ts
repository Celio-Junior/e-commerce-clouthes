'use server';

import { EXPIRE_TAG_CACHE } from '@/lib/constants';

import { colorRepository } from '@/repository/color';
import { revalidateTag } from 'next/cache';

type BillboardDeleteActionType = {
  id: string;
};

export default async function colorDeleteAction(data: BillboardDeleteActionType) {
  const { id } = data;

  try {
    await colorRepository.remove(id);
    revalidateTag('colors', { expire: EXPIRE_TAG_CACHE });
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
