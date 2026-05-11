import ErrorMessage from '@/components/ErrorMessage';

export default function NotFoundPage() {
  return (
    <ErrorMessage title="Página nao encontrada" codeTitle="404" content="Página nao existe nesse blog" />
  );
}
