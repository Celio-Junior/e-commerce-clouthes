'use server';

import { SizeActionType } from '@/interfaces/Size.interface';
import { EXPIRE_TAG_BILLBOARDS } from '@/lib/constants';

import { SizeUpdateFormSchema, sizeUpdateFormType } from '@/lib/validations/size';
import { sizeRepository } from '@/repository/size';
import { formatZodMessage } from '@/utils/formats-functions';
import { revalidateTag } from 'next/cache';

export default async function sizeUpdateAction(data: sizeUpdateFormType): Promise<SizeActionType> {
  const validSizeForm = SizeUpdateFormSchema.safeParse(data);

  if (!validSizeForm.success) {
    return {
      errors: formatZodMessage(validSizeForm.error),
      success: false,
    };
  }
  try {
    const sizeData = validSizeForm.data;
    await sizeRepository.update(sizeData.id, sizeData);
    console.log('teste category', data);
    revalidateTag('billboards', { expire: EXPIRE_TAG_BILLBOARDS });
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
