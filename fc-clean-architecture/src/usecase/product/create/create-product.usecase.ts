import Product from "../../../domain/product/entity/product";

interface CreateProductInputDto {
  id: string;
  name: string;
  price: number;
}

interface CreateProductOutputDto {
  id: string;
  name: string;
  price: number;
}

export default class CreateProductUseCase {
  constructor(private productRepository: ProductRepositoryInterface) {}

  async execute(input: CreateProductInputDto): Promise<CreateProductOutputDto> {
    const product = new Product(input.id, input.name, input.price);
    await this.productRepository.create(product);
    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
