import Button from '../Button';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import clsx from 'clsx';

export default function ButtonSocial() {
  const buttonClassDefault = clsx(
    'border border-transparent flex justify-center w-[40%] shadow-sm shadow-gray-500 transition hover:border-gray-600 cursor-pointer active:bg-gray-400 hover:scale-105',
  );
  return (
    <div className="flex gap-3 w-full justify-evenly mt-4">
      <Button className={buttonClassDefault} variant="customize">
        <FcGoogle size={30} />{' '}
      </Button>
      <Button className={buttonClassDefault} variant="customize">
        <FaGithub size={30} />
      </Button>
    </div>
  );
}
