'use server';

import { SizeActionType } from '@/interfaces/Size.interface';
import { EXPIRE_TAG_BILLBOARDS } from '@/lib/constants';

import { SizeUpdateFormSchema, sizeUpdateFormType } from '@/lib/validations/size';
import { colorRepository } from '@/repository/color';

import { formatZodMessage } from '@/utils/formats-functions';
import { revalidateTag } from 'next/cache';

export default async function colorUpdateAction(data: sizeUpdateFormType): Promise<SizeActionType> {
  const validSizeForm = SizeUpdateFormSchema.safeParse(data);

  if (!validSizeForm.success) {
    return {
      errors: formatZodMessage(validSizeForm.error),
      success: false,
    };
  }
  try {
    const sizeData = validSizeForm.data;
    await colorRepository.update(sizeData.id, sizeData);

    revalidateTag('colors', { expire: EXPIRE_TAG_BILLBOARDS });
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
