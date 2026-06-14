import Container from '@/components/Container';
import CategoryClient from './client';

import { CategoryColumn } from './components/columns';

import { Suspense } from 'react';
import { cacheCategoryAll } from '@/lib/cache/category';

export default async function CategoryPage() {
  const billboards = await cacheCategoryAll();
  const formattedBillboards: CategoryColumn[] = billboards.map(
    ({ id, name: label, billboard, createdAt }) => ({
      id,
      label,
      billboard,
      createdAt,
    }),
  );

  return (
    <Container>
      <Suspense fallback={null}>
        <CategoryClient data={formattedBillboards} />
      </Suspense>
    </Container>
  );
}
