import ProductRepositoryInterface from "../../repository/product-repository.interface";

interface ListProductsOutputDto {
  id: string;
  name: string;
  price: number;
}

export default class ListProductsUseCase {
  constructor(private productRepository: ProductRepositoryInterface) {}

  async execute(): Promise<ListProductsOutputDto[]> {
    const products = await this.productRepository.findAll();
    return products.map(product => ({
      id: product.id,
      name: product.name,
      price: product.price,
    }));
  }
}
