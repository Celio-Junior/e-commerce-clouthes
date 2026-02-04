import { ZodError } from 'zod';

export default function formateZodMessage<T>(errors: ZodError<T>) {
  return errors.issues.map((err) => err.message);
}
