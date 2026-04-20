'use server';

import { BillboardFormDataType, BillboardFormSchema } from '@/lib/validations/billboard';
import { billboardRepository } from '@/repository/billboard';

import { formatZodMessage } from '@/utils/formats-functions';

type BillboardActionType = {
  errors: string[];
  success: boolean;
};

export default async function billboardAction(data: BillboardFormDataType): Promise<BillboardActionType> {
  const validBillboardForm = BillboardFormSchema.safeParse(data);

  if (!validBillboardForm.success) {
    return {
      errors: formatZodMessage(validBillboardForm.error),
      success: false,
    };
  }

  try {
    await billboardRepository.create(validBillboardForm.data);
    return {
      errors: [],
      success: true,
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
