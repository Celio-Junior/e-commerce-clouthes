import Container from '@/components/Container';
import FormBillboard from '@/components/admin/FormBillboard';
import SubTitle from '@/components/Subtitle';
import { billCacheAllImages } from '@/lib/cache/billboard';
import { billboardRepository } from '@/repository/billboard';
import NotFoundPage from '@/app/(admin)/not-found';

import { FC, Suspense } from 'react';

type BillboardNewPageProps = { params: Promise<{ id: string }> };

export default async function BillboardNewPage({ params }: BillboardNewPageProps) {
  // TODO validar id billboard
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
  const billboardsImages = await billCacheAllImages();
  const isBillboard = await billboardRepository.findById(id).catch(() => null);
  if (!isBillboard) return NotFoundPage();
  return (
    <>
      <SubTitle title="Edit billboard" description="Update data billboard" />

      <FormBillboard
        method="update"
        billboard={{ id, image_id: isBillboard.image_id, label: isBillboard.label }}
        billboardsImgs={billboardsImages}
      />
    </>
  );
};
