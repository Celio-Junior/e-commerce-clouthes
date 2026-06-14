import Container from '@/components/Container';

import SubTitle from '@/components/Subtitle';

import NotFoundPage from '@/app/(admin)/not-found';

import { FC, Suspense } from 'react';

import { sizeRepository } from '@/repository/size';
import FormSize from '@/components/admin/Form/FormSize';

type BillboardNewPageProps = { params: Promise<{ id: string }> };

export default async function CategoryNewPage({ params }: BillboardNewPageProps) {
  // FIXME fazer edit de category, refatorar(tanto actions e etc)
  // const { id } = await params;
  return (
    <Container>
      <Suspense fallback={null}>
        <BillboardDetailPage params={params} />
      </Suspense>
    </Container>
  );
}

// type BillboardDetailPageProps = {
//   id: string;
// };

const BillboardDetailPage: FC<BillboardNewPageProps> = async ({ params }) => {
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
