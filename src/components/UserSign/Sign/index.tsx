import ButtonSocial from '@/components/ButtonSocial';
import FormUserSing from '@/components/FormUserSign';
import Link from 'next/link';
import { MouseEvent } from 'react';

type SignProps = {
  actionUser: 'login' | 'create';
  handleActionUser: () => void;
};

//TODO terminar estilização do form
export default function Sign({ actionUser, handleActionUser }: SignProps) {
  const handleClickDirection = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    handleActionUser();
  };
  return (
    <div className="w-[60%] h-full max-w-xl p-4 flex flex-col items-center justify-evenly ">
      <div className="w-full">
        <h2 className="text-4xl font-bold text-gray-950 text-center">
          {actionUser === 'login' ? 'Welcome Back' : 'Create your account'}
        </h2>
        <p className="text-sm text-gray-500 ml-4 my-4">
          {actionUser === 'login'
            ? 'Fill in your information to log in.'
            : 'Create your account with us now to stay more fashionable.'}
        </p>
        {/* passar de handleAction user */}
        <FormUserSing handleActionSign={handleActionUser} typeMethod={actionUser} />
      </div>

      <p className="text-sm text-gray-500 text-center">or enter</p>
      <ButtonSocial />
      <span className=" text-center mt-3">
        {actionUser === 'login' ? 'Don´t have account?' : 'Already have account?'}

        <Link
          onClick={handleClickDirection}
          className="text-gray-600 font-semibold underline hover:text-gray-800"
          href={'/'}
        >
          {actionUser === 'login' ? 'Create account' : 'Login'}
        </Link>
      </span>
    </div>
  );
}
