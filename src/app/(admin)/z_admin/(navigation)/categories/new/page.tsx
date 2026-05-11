import Container from '@/components/Container';
import FormBillboard from '@/components/admin/FormBillboard';
import SubTitle from '@/components/Subtitle';

import { billCacheAllImages } from '@/lib/cache/billboard';
import { Suspense } from 'react';

export default async function BillboardNewPage() {
  const billboardsImages = await billCacheAllImages();
  return (
    <Container>
      <SubTitle title="Create billboard" description="Add new billboard" />
      <Suspense fallback={null}>
        <FormBillboard method="create" billboardsImgs={billboardsImages} />
      </Suspense>
    </Container>
  );
}
