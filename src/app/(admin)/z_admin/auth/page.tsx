'use client';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { useTransition } from 'react';

export const dynamic = 'force-dynamic';
export default function AuthPage() {
  const [isTransition, transitionLoginAdmin] = useTransition();

  return (
    <div className="w-2xl mt-40 mx-auto">
      <h2 className="text-center mb-10 text-5xl font-bold">Admin Store</h2>
      <form className="w-full flex flex-col">
        <Input type="text">Email</Input>
        <Input type="password">Password</Input>
        <Button disabled={isTransition} variant="confirm" className="w-[60%] mt-10 self-center">
          {' '}
          Entrar
        </Button>
      </form>
    </div>
  );
}
