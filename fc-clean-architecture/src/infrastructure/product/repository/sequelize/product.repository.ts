import Product from "../../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../../domain/product/repository/product-repository.interface";
import ProductModel from "./product.model";

export default class ProductRepository implements ProductRepositoryInterface {
  async create(entity: Product): Promise<void> {
    try {
      await ProductModel.create({
        id: entity.id,
        name: entity.name,
        price: entity.price,
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error creating product: ${error.message}`);
      }
      throw error; // Re-throw se não for Error
    }
  }

  async update(entity: Product): Promise<void> {
    try {
      const [updatedRows] = await ProductModel.update(
        {
          name: entity.name,
          price: entity.price,
        },
        {
          where: {
            id: entity.id,
          },
        }
      );

      if (updatedRows === 0) {
        throw new Error("Product not found for update");
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error updating product: ${error.message}`);
      }
      throw error;
    }
  }

  async find(id: string): Promise<Product> {
    try {
      const productModel = await ProductModel.findOne({ where: { id } });

      if (!productModel) {
        throw new Error("Product not found");
      }

      return new Product(productModel.id, productModel.name, productModel.price);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error finding product: ${error.message}`);
      }
      throw error;
    }
  }

  async findAll(): Promise<Product[]> {
    try {
      const productModels = await ProductModel.findAll();
      return productModels.map((productModel) =>
        new Product(productModel.id, productModel.name, productModel.price)
      );
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error fetching all products: ${error.message}`);
      }
      throw error;
    }
  }
}
