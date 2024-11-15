import FindProductUseCase from "./find-product.usecase";
import Product from "@src/domain/product/entity/product";

const MockRepository = () => ({
  create: jest.fn(),
  find: jest.fn().mockResolvedValue(new Product("1", "Product 1", 100)),
  findAll: jest.fn(),
  update: jest.fn(),
});

describe("Find Product Use Case", () => {
  it("should find a product", async () => {
    const productRepository = MockRepository();
    const findProductUseCase = new FindProductUseCase(productRepository);

    const input = { id: "1" };

    const output = await findProductUseCase.execute(input);

    expect(output).toEqual({
      id: "1",
      name: "Product 1",
      price: 100,
    });

    expect(productRepository.find).toHaveBeenCalledWith("1");
  });

  it("should throw an error if product is not found", async () => {
    const productRepository = MockRepository();
    productRepository.find.mockResolvedValue(null); 

    const findProductUseCase = new FindProductUseCase(productRepository);
    const input = { id: "2" };

    await expect(findProductUseCase.execute(input)).rejects.toThrow("Product not found");
  });
});
