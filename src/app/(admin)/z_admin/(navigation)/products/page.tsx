import Container from '@/components/Container';
import ProductClient from './client';

// import { SizeColumn } from './components/columns';

import { Suspense } from 'react';

import { cacheProductAll } from '@/lib/cache/product.cache';

export default async function ColorPage() {
  const products = await cacheProductAll();

  return (
    <Container>
      <Suspense fallback={null}>
        <ProductClient data={products} />
      </Suspense>
    </Container>
  );
}
