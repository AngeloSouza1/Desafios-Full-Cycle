import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import FindProductUseCase from "./find-product.usecase";
import { FindProductInputDto, FindProductOutputDto } from "./find-product.dto";
import Product from "../../../domain/product/entity/product";

describe("Find Product Use Case Integration Test", () => {
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

  it("should find a product", async () => {
    const productRepository = new ProductRepository();
    const useCase = new FindProductUseCase(productRepository);

    const product = new Product("1", "Product A", 100);
    await productRepository.create(product);

    const input: FindProductInputDto = { id: "1" };
    const result: FindProductOutputDto = await useCase.execute(input);

    expect(result).toEqual({
      id: "1",
      name: "Product A",
      price: 100,
    });
  });
});
