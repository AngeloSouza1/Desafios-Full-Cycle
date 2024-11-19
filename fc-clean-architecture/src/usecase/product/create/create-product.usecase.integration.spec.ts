import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./create-product.usecase";
import { CreateProductInputDto, CreateProductOutputDto } from "./create-product.dto";

describe("Create Product Use Case Integration Test", () => {
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

  it("should create a product", async () => {
    const productRepository = new ProductRepository();
    const useCase = new CreateProductUseCase(productRepository);

    const input: CreateProductInputDto = {
      id: "1",
      name: "Product A",
      price: 100,
    };

    const result: CreateProductOutputDto = await useCase.execute(input);

    expect(result).toEqual({
      id: "1",
      name: "Product A",
      price: 100,
    });
  });
});
