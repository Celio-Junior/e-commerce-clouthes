import Container from '@/components/Container';
import SizeClient from './client';

// import { SizeColumn } from './components/columns';

import { Suspense } from 'react';

import { cacheSizeAll } from '@/lib/cache/size.cache';

export default async function SizePage() {
  const sizes = await cacheSizeAll();

  return (
    <Container>
      <Suspense fallback={null}>
        <SizeClient data={sizes} />
      </Suspense>
    </Container>
  );
}
