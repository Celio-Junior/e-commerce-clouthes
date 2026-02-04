import FormUserSing from '@/components/FormUserSign';
import Link from 'next/link';

export default function SingIn() {
  return (
    <div className="max-w-xl mx-auto my-30 p-3 flex flex-col gap-2">
      <h2 className="text-3xl font-bold text-blue-700 text-center">Faça Login na sua conta</h2>
      <p className="text-md text-gray-500 ml-4">
        <strong>Entrar</strong> e <strong>acessar</strong> sua conta pra você explorar mais dos nossos
        <strong> produtos</strong>.
      </p>
      <FormUserSing typeMethod="login" />
      <span className="font-semibold text-center mt-3">
        Não tem conta?{' '}
        <Link className="text-blue-600 underline hover:text-blue-800" href={'/user/signup'}>
          Cria ou registra-se aqui.
        </Link>
      </span>
    </div>
  );
}
