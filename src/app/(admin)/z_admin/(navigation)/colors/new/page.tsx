import FormColor from '@/components/admin/Form/FormColor';

import Container from '@/components/Container';

import SubTitle from '@/components/Subtitle';

export default async function CategoryNewPage() {
  return (
    <Container>
      <SubTitle title="Create color" description="Add new size" />
      <FormColor method="create" />
    </Container>
  );
}
