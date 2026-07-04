import FormProduct from '@/components/admin/Form/FormProduct';

import Container from '@/components/Container';

import SubTitle from '@/components/Subtitle';
import { cacheCategoryAll } from '@/lib/cache/category';
import { cacheColorAll } from '@/lib/cache/color.cache';
import { cacheSizeAll } from '@/lib/cache/size.cache';

export default async function ProductNewPage() {
  const sections = await Promise.all([cacheCategoryAll(), cacheSizeAll(), cacheColorAll()]);

  return (
    <Container>
      <SubTitle title="Create Product" description="Add new product" />
      <FormProduct method="create" categories={sections[0]} sizes={sections[1]} colors={sections[2]} />
    </Container>
  );
}
