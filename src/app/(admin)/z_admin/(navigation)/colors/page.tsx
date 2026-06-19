import Container from '@/components/Container';
import ColorClient from './client';

// import { SizeColumn } from './components/columns';

import { Suspense } from 'react';

import { cacheColorAll } from '@/lib/cache/color.cache';

export default async function ColorPage() {
  const sizes = await cacheColorAll();

  return (
    <Container>
      <Suspense fallback={null}>
        <ColorClient data={sizes} />
      </Suspense>
    </Container>
  );
}
