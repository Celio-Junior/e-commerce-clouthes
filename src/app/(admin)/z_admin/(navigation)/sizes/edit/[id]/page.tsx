import Container from '@/components/Container';

import SubTitle from '@/components/Subtitle';

import NotFoundPage from '@/app/(admin)/not-found';

import { FC, Suspense } from 'react';

import { sizeRepository } from '@/repository/size';
import FormSize from '@/components/admin/Form/FormSize';

type SizeNewPageProps = { params: Promise<{ id: string }> };

export default async function SizeNewPage({ params }: SizeNewPageProps) {
  // FIXME fazer edit de category, refatorar(tanto actions e etc)
  // const { id } = await params;
  return (
    <Container>
      <Suspense fallback={null}>
        <SizeDetailPage params={params} />
      </Suspense>
    </Container>
  );
}

// type SizeDetailPageProps = {
//   id: string;
// };

const SizeDetailPage: FC<SizeNewPageProps> = async ({ params }) => {
  const { id } = await params;
  const isSize = await sizeRepository.findById(id);

  if (!isSize) return NotFoundPage();
  return (
    <>
      <SubTitle title="Edit Size" description="Update data Size" />

      <FormSize size={isSize} method="update" />
    </>
  );
};
