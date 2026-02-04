'use client';

import createUserAction from '@/actions/user/ create-user.action';
import Button from '../Button';
import Input from '../Input';
import { useActionState, useEffect } from 'react';
import { UserPublicDto } from '@/dto/User.dto';
import { toast } from 'react-toastify';

type FormUserSingProps = {
  typeMethod: 'create' | 'login';
};

export default function FormUserSing({ typeMethod }: FormUserSingProps) {
  const isSignup = typeMethod === 'create' ? true : false;

  const methodActionsUser = {
    create: createUserAction,
    login: createUserAction,
  };
  const [state, action, isPending] = useActionState(methodActionsUser[typeMethod], {
    errors: [],
    formState: UserPublicDto.parse({}),
  });

  useEffect(() => {
    if (state.errors.length !== 0) state.errors.forEach((err) => toast.error(err, { toastId: err }));
  }, [state]);

  return (
    <form className="flex flex-col" action={action}>
      {isSignup && (
        <Input defaultValue={state.formState.name} name="name" placeholder="ex: Fulano souza">
          Name
        </Input>
      )}
      <Input defaultValue={state.formState.email} name="email" placeholder="fulano123@gmail.com" type="email">
        email
      </Input>
      {isSignup && (
        <Input defaultValue={state.formState.phone} name="phone" placeholder="ex: 99991737513" type="number">
          Phone(Optional)
        </Input>
      )}

      <Input defaultValue={''} name="password" placeholder="Sua senha secreta" type="password">
        Password
      </Input>
      {isSignup && (
        <Input defaultValue={''} name="repPassword" placeholder="Sua senha secreta novamente" type="password">
          Retry password
        </Input>
      )}

      <Button disabled={isPending} type="submit" className="mt-6 " variant="confirm">
        {!isSignup ? 'Entrar' : 'Criar'}
      </Button>
    </form>
  );
}
