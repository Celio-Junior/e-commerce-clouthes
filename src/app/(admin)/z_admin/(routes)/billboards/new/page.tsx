import Container from '@/components/Container';
import FormBillboard from '@/components/FormBillboard';
import SubTitle from '@/components/Subtitle';
import { billboardRepository } from '@/repository/billboard';

export default async function BillboardNewPage() {
  const billboardsImages = await billboardRepository.findAllImages();
  return (
    <Container>
      <SubTitle title="Create billboard" description="Add new billboard" />
      <FormBillboard billboardsImgs={billboardsImages} />
    </Container>
  );
}
