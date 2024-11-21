import Product from "@domain/product/entity/product";
import ProductRepositoryInterface from "@domain/product/repository/product-repository.interface";


interface ListProductsOutputDto {
  id: string;
  name: string;
  price: number;
}

export default class ListProductsUseCase {
  constructor(private productRepository: ProductRepositoryInterface) {}

  async execute(): Promise<{ products: ListProductsOutputDto[] }> {
    const products = await this.productRepository.findAll();
    return {
      products: products.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
      })),
    };
  }
}

