'use client';
import loginAdmin from '@/actions/admin/login';
import Button from '@/components/Button';
import Input from '@/components/Input';

import { useTransition } from 'react';
import { toast } from 'react-toastify';

export default function FormAuth() {
  const [isTransition, transitionLoginAdmin] = useTransition();
  function handleSubmitIsAdmin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    transitionLoginAdmin(async () => {
      const { errors, success } = await loginAdmin(new FormData(e.target as HTMLFormElement));

      if (!success) {
        if (errors.length !== 0) errors.forEach((err) => toast.error(err, { toastId: err }));
        return;
      }
    });
  }
  return (
    <form onSubmit={handleSubmitIsAdmin} className="w-full flex flex-col">
      <Input name="email" type="text">
        Email
      </Input>
      <Input type="password" name="password">
        Password
      </Input>
      <Button disabled={isTransition} variant="confirm" className="w-[60%] mt-10 self-center">
        {' '}
        Entrar
      </Button>
    </form>
  );
}
