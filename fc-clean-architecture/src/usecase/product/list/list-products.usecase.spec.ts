import ListProductsUseCase from "./list-products.usecase";
import Product from "../../../domain/product/entity/product";

const MockRepository = () => ({
  create: jest.fn(),
  find: jest.fn(),
  findAll: jest.fn().mockResolvedValue([
    new Product("1", "Product 1", 100),
    new Product("2", "Product 2", 200),
  ]),
  update: jest.fn(),
});

describe("List Products Use Case", () => {
  it("should list all products", async () => {
    const productRepository = MockRepository();
    const listProductsUseCase = new ListProductsUseCase(productRepository);

    const output = await listProductsUseCase.execute();

    expect(output).toEqual({
      products: [
        {
          id: "1",
          name: "Product 1",
          price: 100,
        },
        {
          id: "2",
          name: "Product 2",
          price: 200,
        },
      ],
    });

    expect(productRepository.findAll).toHaveBeenCalled();
  });
});
