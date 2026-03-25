import { UserPublicDtoSchema } from '@/dto/User.dto';

type ActionUserType = 'CREATE_USER' | 'LOGIN_USER';

export type UserActionInterface = {
  errors: string[];
  formState: UserPublicDtoSchema;
  success: boolean;
  actionType?: ActionUserType;
};
