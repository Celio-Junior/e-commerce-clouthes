import FormAuth from '@/components/admin/FormAuth';

export const dynamic = 'force-dynamic';
export default function AuthPage() {
  return (
    <div className="w-2xl mt-40 mx-auto">
      <h2 className="text-center mb-10 text-5xl font-bold">Admin Store</h2>
      <FormAuth />
    </div>
  );
}
