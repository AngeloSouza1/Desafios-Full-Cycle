import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductsUseCase from "./list-products.usecase";
import { ListProductsOutputDto } from "./list-products.dto";
import Product from "../../../domain/product/entity/product";

describe("List Products Use Case Integration Test", () => {
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

  it("should list all products", async () => {
    const productRepository = new ProductRepository();
    const useCase = new ListProductsUseCase(productRepository);

    const product1 = new Product("1", "Product A", 100);
    const product2 = new Product("2", "Product B", 200);

    await productRepository.create(product1);
    await productRepository.create(product2);

    const result: ListProductsOutputDto[] = await useCase.execute();

    expect(result).toEqual([
      { id: "1", name: "Product A", price: 100 },
      { id: "2", name: "Product B", price: 200 },
    ]);
  });
});
