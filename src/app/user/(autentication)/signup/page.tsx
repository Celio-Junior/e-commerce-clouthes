import FormUserSing from '@/components/FormUserSign';
import Link from 'next/link';

export default function SingUp() {
  return (
    <div className="max-w-xl mx-auto my-30 p-3 flex flex-col gap-2">
      <h2 className="text-3xl font-bold text-blue-700 text-center">Cria sua conta</h2>
      <p className="text-md text-gray-500 ml-4">Cria sua conta para explorar mais dos nosso produtos</p>
      <FormUserSing typeMethod="create" />
      <span className="font-semibold text-center mt-3">
        tem conta?{' '}
        <Link className="text-blue-600 underline hover:text-blue-800" href={'/user/signin'}>
          entrar aqui.
        </Link>
      </span>
    </div>
  );
}
