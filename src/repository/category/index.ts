import { CategoryPublicType, CategoryRepositoryInterface } from '@/interfaces/Category.interface';

//TODO fazendo repository, e ver relacionamento com billboard
class CategoryRepository implements CategoryRepositoryInterface {
  create(data: CategoryPublicType): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findAllPublic(): Promise<CategoryPublicType[]> {
    throw new Error('Method not implemented.');
  }
}
