import Button from '@/components/Button';
import Container from '@/components/Container';
import Input from '@/components/Input';

export default function SettingsPage() {
  return (
    <Container>
      <div className="">
        <h1 className="font-bold text-3xl">Manage store</h1>
        <p className="text-sm text-gray-500">Configurações gerais da loja</p>
      </div>
      <Input className="w-80">Name store</Input>

      <Button className="mt-10">Save changes</Button>
    </Container>
  );
}
