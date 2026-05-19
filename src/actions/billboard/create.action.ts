'use server';

import { BillboardActionType } from '@/interfaces/Billboard.interface';
import { EXPIRE_TAG_BILLBOARDS } from '@/lib/constants';
import { BillboardCreateFormType, BillboardCreateFormSchema } from '@/lib/validations/billboard';
import { billboardRepository } from '@/repository/billboard';

import { formatZodMessage } from '@/utils/formats-functions';
import { revalidateTag } from 'next/cache';

export default async function billboardCreateAction(
  data: BillboardCreateFormType,
): Promise<BillboardActionType> {
  const validBillboardForm = BillboardCreateFormSchema.safeParse(data);

  if (!validBillboardForm.success) {
    return {
      errors: formatZodMessage(validBillboardForm.error),
      success: false,
    };
  }

  try {
    const { image_id, image_url, label } = validBillboardForm.data;
    const imgId = await billboardRepository.create({ image_url, label, image_id });
    revalidateTag('billboards', { expire: EXPIRE_TAG_BILLBOARDS });
    return {
      success: true,
      data: imgId,
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
