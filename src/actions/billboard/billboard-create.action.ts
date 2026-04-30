'use server';

import { BillboardActionType } from '@/interfaces/Billboard.interface';
import { BillboardFormDataType, BillboardFormSchema } from '@/lib/validations/billboard';
import { billboardRepository } from '@/repository/billboard';

import { formatZodMessage } from '@/utils/formats-functions';

export default async function billboardAction(data: BillboardFormDataType): Promise<BillboardActionType> {
  const validBillboardForm = BillboardFormSchema.safeParse(data);

  if (!validBillboardForm.success) {
    return {
      errors: formatZodMessage(validBillboardForm.error),
      success: false,
    };
  }

  try {
    const { id, image_url, label } = validBillboardForm.data;
    const imgId = await billboardRepository.create({ image_url, label, image_id: id });
    return {
      success: true,
      data: imgId,
    };
  } catch (e) {
    if (e instanceof Error) {
      console.log('teste', e.message);
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
