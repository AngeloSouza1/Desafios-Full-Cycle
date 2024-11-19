import CreateProductUseCase from "./create-product.usecase";
import ProductRepositoryInterface from "@domain/product/repository/product-repository.interface";
import Product from "@domain/product/entity/product";

const MockRepository = () => ({
  create: jest.fn(),
  find: jest.fn(),
  findAll: jest.fn(),
  update: jest.fn(),
});

describe.only("Create Product Use Case", () => {
  it("should create a product", async () => {
    const productRepository = MockRepository();
    const createProductUseCase = new CreateProductUseCase(productRepository);

    const input = {
      id: "1",
      name: "Product 1",
      price: 100,
    };

    const output = await createProductUseCase.execute(input);

    expect(output).toEqual({
      id: "1",
      name: "Product 1",
      price: 100,
    });
  });
});
