import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update-product.usecase";
import { UpdateProductInputDto, UpdateProductOutputDto } from "./update-product.dto";
import Product from "../../../domain/product/entity/product";

describe("Update Product Use Case Integration Test", () => {
  let sequelize: Sequelize;

  beforeAll(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    const useCase = new UpdateProductUseCase(productRepository);

    const product = new Product("1", "Product A", 100);
    await productRepository.create(product);

    const input: UpdateProductInputDto = {
      id: "1",
      name: "Product A Updated",
      price: 150,
    };

    const result: UpdateProductOutputDto = await useCase.execute(input);

    expect(result).toEqual({
      id: "1",
      name: "Product A Updated",
      price: 150,
    });
  });
});
