'use client';

import Button from '../Button';
import Input from '../Input';
import { ChangeEvent, useActionState, useEffect, useState } from 'react';
import { UserPublicDto } from '@/dto/User.dto';
import { toast } from 'react-toastify';
import clsx from 'clsx';
import registerAction from '@/actions/user/ register.action';
import loginAction from '@/actions/user/login.action';
import { useContextViewFormUser } from '@/context/ViewFormUser/useContext';
import { UserActionInterface } from '@/interfaces/user/useAction';

export default function FormUserSing() {
  const [{ setSignUser }, { isViewFormLogin, setIsViewFormLogin }] = useContextViewFormUser();

  const [state, action, isPending] = useActionState(
    (prevState: UserActionInterface, formData: FormData) => {
      const currentAction = isViewFormLogin ? registerAction : loginAction;
      return currentAction(prevState, formData);
    },
    {
      errors: [],
      formState: UserPublicDto.parse({}),
      success: false,
    },
  );

  const [phone, setPhone] = useState(state.formState.phone);

  useEffect(() => {
    if (state.errors.length !== 0) state.errors.forEach((err) => toast.error(err, { toastId: err }));

    if (state.success && state.actionType === 'LOGIN_USER') {
      toast.success('Login success', {
        toastId: 'login success',
      });

      setSignUser((prev) => !prev);
    }
    if (state.success && state.actionType === 'CREATE_USER') {
      toast.success('User create with success', {
        toastId: 'success user created',
      });

      setIsViewFormLogin((prev) => !prev);
    }
  }, [setSignUser, state, setIsViewFormLogin]);

  function handleChangeInputPhone(e: ChangeEvent<HTMLInputElement>) {
    const phoneValue = e.target.value.trim();
    if (phoneValue.match(/\D/)) return;
    if (phoneValue.length > 11) return;

    setPhone(() => phoneValue);
  }

  return (
    <form key={isViewFormLogin ? 'create' : 'login'} className="flex flex-col" action={action}>
      {isViewFormLogin && (
        <Input defaultValue={state.formState.name} name="name" placeholder="ex: Fulano souza">
          Name
        </Input>
      )}
      <Input
        //TODO acho que tem mudar isso
        defaultValue={state.formState.email}
        name="email"
        placeholder="example123@gmail.com"
        type="email"
      >
        email
      </Input>
      {isViewFormLogin && (
        <Input
          // defaultValue={state.formState.phone}

          onChange={handleChangeInputPhone}
          name="phone"
          placeholder="ex: 99991737513"
          type="text"
          value={phone}
        >
          Phone(Optional)
        </Input>
      )}

      <div className={clsx('grid gap-2', isViewFormLogin && 'grid-cols-2')}>
        <Input defaultValue={''} name="password" placeholder="ex: store23" type="password">
          Password
        </Input>
        {isViewFormLogin && (
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
        {!isViewFormLogin ? 'Login' : 'Create account'}
      </Button>
    </form>
  );
}
