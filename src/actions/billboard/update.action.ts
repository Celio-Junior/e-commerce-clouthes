'use server';

import { BillboardActionType } from '@/interfaces/Billboard.interface';
import { BillboardUpdateFormSchema, BillboardUpdateFormType } from '@/lib/validations/billboard';
import { billboardRepository } from '@/repository/billboard';
import { formatZodMessage } from '@/utils/formats-functions';
import { revalidateTag } from 'next/cache';

export default async function billboardUpdateAction(
  data: BillboardUpdateFormType,
): Promise<BillboardActionType> {
  const validBillboardForm = BillboardUpdateFormSchema.safeParse(data);

  if (!validBillboardForm.success) {
    return {
      errors: formatZodMessage(validBillboardForm.error),
      success: false,
    };
  }

  try {
    const billboardData = validBillboardForm.data;
    const imgId = await billboardRepository.update(billboardData.id, billboardData);
    revalidateTag('billboards', { expire: 1000 * 60 * 2 });
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
