import FormSize from '@/components/admin/Form/FormSize';
import Container from '@/components/Container';

import SubTitle from '@/components/Subtitle';

export default async function CategoryNewPage() {
  return (
    <Container>
      <SubTitle title="Create size" description="Add new size" />
      <FormSize method="create" />
    </Container>
  );
}
