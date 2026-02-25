import { UserPublicDtoSchema } from '@/dto/User.dto';

type ActionUserType = 'CREATE_USER' | 'LOGIN_USER';

export type UserAction = {
  errors: string[];
  formState: UserPublicDtoSchema;
  success: boolean;
  actionType?: ActionUserType;
};
