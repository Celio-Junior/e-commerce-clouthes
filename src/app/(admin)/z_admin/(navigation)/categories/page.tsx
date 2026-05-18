import Container from '@/components/Container';
import CategoryClient from './client';

import { BillBoardColumn } from './components/columns';
import { billCacheAllBillboards } from '@/lib/cache/billboard';
import { Suspense } from 'react';

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
        <CategoryClient data={formattedBillboards} />
      </Suspense>
    </Container>
  );
}
