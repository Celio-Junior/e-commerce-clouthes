import Container from '@/components/Container';

import SubTitle from '@/components/Subtitle';

import NotFoundPage from '@/app/(admin)/not-found';

import { FC, Suspense } from 'react';

import { colorRepository } from '@/repository/color';
import FormColor from '@/components/admin/Form/FormColor';

type ColorNewPageProps = { params: Promise<{ id: string }> };

export default async function ColorNewPage({ params }: ColorNewPageProps) {
  return (
    <Container>
      <Suspense fallback={null}>
        <ColorDetailPage params={params} />
      </Suspense>
    </Container>
  );
}

const ColorDetailPage: FC<ColorNewPageProps> = async ({ params }) => {
  const { id } = await params;
  const isColor = await colorRepository.findById(id);

  if (!isColor) return NotFoundPage();
  return (
    <>
      <SubTitle title="Edit Color" description="Update data Color" />

      <FormColor color={isColor} method="update" />
    </>
  );
};
