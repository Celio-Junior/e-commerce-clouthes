'use server';

import { EXPIRE_TAG_BILLBOARDS } from '@/lib/constants';
import { billboardRepository } from '@/repository/billboard';
import { revalidateTag } from 'next/cache';

type BillboardDeleteActionType = {
  id: string;
};

export default async function categoryDeleteAction(data: BillboardDeleteActionType) {
  const { id } = data;

  try {
    await billboardRepository.remove(id);
    revalidateTag('billboards', { expire: EXPIRE_TAG_BILLBOARDS });
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
