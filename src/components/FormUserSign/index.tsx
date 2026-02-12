'use client';

import registerAction from '@/actions/user/ register.action';
import Button from '../Button';
import Input from '../Input';
import { useActionState, useEffect } from 'react';
import { UserPublicDto } from '@/dto/User.dto';
import { toast } from 'react-toastify';
import clsx from 'clsx';
import LoginAction from '@/actions/user/login.action';
import { useContextViewFormUser } from '@/context/ViewFormUser/useContext';

type FormUserSingProps = {
  typeMethod: 'create' | 'login';
};

export default function FormUserSing({ typeMethod }: FormUserSingProps) {
  const isSignup = typeMethod === 'create' ? true : false;
  const [{ setSignUser }, { setIsViewFormLogin }] = useContextViewFormUser();
  const methodActionsUser = {
    create: registerAction,
    login: LoginAction,
  };
  const [state, action, isPending] = useActionState(methodActionsUser[typeMethod], {
    errors: [],
    formState: UserPublicDto.parse({}),
    success: false,
  });

  useEffect(() => {
    if (state.errors.length !== 0) state.errors.forEach((err) => toast.error(err, { toastId: err }));

    if (state.success && typeMethod === 'create') {
      toast.success('User create with success', {
        toastId: 'success user created',
      });

      setIsViewFormLogin((prev) => !prev);
    } else if (state.success) {
      toast.success('Login success', {
        toastId: 'login success',
      });

      setSignUser((prev) => !prev);
    }
  }, [setSignUser, state, typeMethod, setIsViewFormLogin]);

  return (
    <form className="flex flex-col" action={action}>
      {isSignup && (
        <Input defaultValue={state.formState.name} name="name" placeholder="ex: Fulano souza">
          Name
        </Input>
      )}
      <Input
        defaultValue={state.formState.email}
        name="email"
        placeholder="example123@gmail.com"
        type="email"
      >
        email
      </Input>
      {isSignup && (
        <Input defaultValue={state.formState.phone} name="phone" placeholder="ex: 99991737513" type="number">
          Phone(Optional)
        </Input>
      )}

      <div className={clsx('grid gap-2', isSignup && 'grid-cols-2')}>
        <Input defaultValue={''} name="password" placeholder="ex: store23" type="password">
          Password
        </Input>
        {isSignup && (
          <Input
            defaultValue={''}
            name="repPassword"
            placeholder="Sua senha secreta novamente"
            type="password"
          >
            Retry password
          </Input>
        )}
      </div>

      <Button disabled={isPending} type="submit" className="mt-6 " variant="confirm">
        {!isSignup ? 'Login' : 'Create account'}
      </Button>
    </form>
  );
}
