import Container from '@/components/Container';

import SubTitle from '@/components/Subtitle';

import NotFoundPage from '@/app/(admin)/not-found';

import { FC, Suspense } from 'react';
import FormCategory from '@/components/admin/Form/FormCategory';
import { categoryRepository } from '@/repository/category';
import { cacheBillboardsAll } from '@/lib/cache/billboard';

type CategoryNewPageProps = { params: Promise<{ id: string }> };

export default async function CategoryNewPage({ params }: CategoryNewPageProps) {
  // FIXME fazer edit de category, refatorar(tanto actions e etc)
  // const { id } = await params;
  return (
    <Container>
      <Suspense fallback={null}>
        <CategoryDetailPage params={params} />
      </Suspense>
    </Container>
  );
}

// type CategoryDetailPageProps = {
//   id: string;
// };

const CategoryDetailPage: FC<CategoryNewPageProps> = async ({ params }) => {
  const { id } = await params;
  const billboards = await cacheBillboardsAll();
  const isCategory = await categoryRepository.findById(id).catch(() => null);
  if (!isCategory) return NotFoundPage();
  return (
    <>
      <SubTitle title="Edit category" description="Update data category" />

      <FormCategory
        category={{ id: isCategory.id, name: isCategory.name, billboard: isCategory.billboard_id }}
        method="update"
        billboards={billboards}
      />
    </>
  );
};
