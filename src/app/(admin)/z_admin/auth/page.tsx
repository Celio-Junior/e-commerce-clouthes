'use client';
import loginAdmin from '@/actions/admin/login';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { redirect } from 'next/navigation';
import React, { useTransition } from 'react';
import { toast } from 'react-toastify';

export const dynamic = 'force-dynamic';
export default function AuthPage() {
  const [isTransition, transitionLoginAdmin] = useTransition();
  function handleSubmitIsAdmin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    transitionLoginAdmin(async () => {
      const { errors, success } = await loginAdmin(new FormData(e.target as HTMLFormElement));

      if (!success) {
        if (errors.length !== 0) errors.forEach((err) => toast.error(err, { toastId: err }));
        return;
      }
      redirect('/');
    });
  }

  return (
    <div className="w-2xl mt-40 mx-auto">
      <h2 className="text-center mb-10 text-5xl font-bold">Admin Store</h2>
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
    </div>
  );
}
