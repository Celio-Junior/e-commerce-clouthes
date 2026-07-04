import Container from '@/components/Container';

import SubTitle from '@/components/Subtitle';

import NotFoundPage from '@/app/(admin)/not-found';

import { FC, Suspense } from 'react';

import FormProduct from '@/components/admin/Form/FormProduct';
import { cacheCategoryAll } from '@/lib/cache/category';
import { cacheSizeAll } from '@/lib/cache/size.cache';
import { cacheColorAll } from '@/lib/cache/color.cache';
import { productRepository } from '@/repository/product';

type ColorNewPageProps = { params: Promise<{ id: string }> };

export default async function ProductEditPage({ params }: ColorNewPageProps) {
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
  const sections = await Promise.all([cacheCategoryAll(), cacheSizeAll(), cacheColorAll()]);
  const isProduct = await productRepository.findById(id);

  if (!isProduct) return NotFoundPage();
  return (
    <>
      <SubTitle title="Edit Product" description="Update datas product" />

      <FormProduct
        method="update"
        product={isProduct}
        categories={sections[0]}
        sizes={sections[1]}
        colors={sections[2]}
      />
    </>
  );
};
