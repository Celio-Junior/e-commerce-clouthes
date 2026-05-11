import Container from '@/components/Container';
import BillboardClient from './client';

import { billCacheAllBillboards } from '@/lib/cache/billboard';
import { Suspense } from 'react';
import { BillBoardColumn } from './components/columns';

export default async function BillboardsPage() {
  const billboards = await billCacheAllBillboards();
  const formattedBillboards: BillBoardColumn[] = billboards.map(({ id, label, createdAt }) => ({
    id,
    label,
    createdAt,
  }));
  return (
    <Container>
      <Suspense fallback={null}>
        <BillboardClient data={formattedBillboards} />
      </Suspense>
    </Container>
  );
}
