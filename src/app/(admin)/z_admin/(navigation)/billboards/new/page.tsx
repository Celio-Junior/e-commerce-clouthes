import FormBillboard from '@/components/admin/Form/FormBillboard';
import Container from '@/components/Container';

import SubTitle from '@/components/Subtitle';

import { cacheBillImgsAll } from '@/lib/cache/billboard';
import { Suspense } from 'react';

export default async function BillboardNewPage() {
  const billboardsImages = await cacheBillImgsAll();
  return (
    <Container>
      <SubTitle title="Create billboard" description="Add new billboard" />
      <Suspense fallback={null}>
        <FormBillboard method="create" billboardsImgs={billboardsImages} />
      </Suspense>
    </Container>
  );
}
