import Product from "@domain/product/entity/product";
import ProductRepositoryInterface from "@domain/product/repository/product-repository.interface";


interface ListProductsOutputDto {
  id: string;
  name: string;
  price: number;
}

export default class ListProductsUseCase {
  constructor(private productRepository: ProductRepositoryInterface) {}

  async execute(): Promise<ListProductsOutputDto[]> {
    const products = await this.productRepository.findAll();

    // Especifica explicitamente o tipo do parâmetro product
    return products.map((product: Product) => ({
      id: product.id,
      name: product.name,
      price: product.price,
    }));
  }
}
