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
    const listProductsUseCase = new ListProductsUseCase(productRepository);
  
    
    await productRepository.create(new Product("1", "Product A", 100));
    await productRepository.create(new Product("2", "Product B", 200));
  
    const result = await listProductsUseCase.execute();
  
   
    expect(result.products.length).toBe(2);
    expect(result.products[0].name).toBe("Product A");
    expect(result.products[1].name).toBe("Product B");
  });
  
});
