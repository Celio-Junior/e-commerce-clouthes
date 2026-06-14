import FormCategory from '@/components/admin/Form/FormCategory';
import Container from '@/components/Container';

import SubTitle from '@/components/Subtitle';
import { cacheBillboardsAll } from '@/lib/cache/billboard';

export default async function CategoryNewPage() {
  const billboards = await cacheBillboardsAll();
  return (
    <Container>
      <SubTitle title="Create category" description="Add new category" />
      <FormCategory billboards={billboards} method="create" />
    </Container>
  );
}
