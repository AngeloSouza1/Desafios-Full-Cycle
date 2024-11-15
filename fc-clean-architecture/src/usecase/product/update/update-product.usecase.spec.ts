import UpdateProductUseCase from "./update-product.usecase";
import Product from "../../../domain/product/entity/product";

const MockRepository = () => ({
  create: jest.fn(),
  find: jest.fn().mockResolvedValue(new Product("1", "Old Product", 50)),
  findAll: jest.fn(),
  update: jest.fn(),
});

describe("Update Product Use Case", () => {
  it("should update a product", async () => {
    const productRepository = MockRepository();
    const updateProductUseCase = new UpdateProductUseCase(productRepository);

    const input = {
      id: "1",
      name: "Updated Product",
      price: 100,
    };

    const output = await updateProductUseCase.execute(input);

    expect(output).toEqual({
      id: "1",
      name: "Updated Product",
      price: 100,
    });

    expect(productRepository.find).toHaveBeenCalledWith("1");

    expect(productRepository.update).toHaveBeenCalledWith(
      expect.objectContaining({
        id: "1",
        name: "Updated Product",
        price: 100,
      })
    );
  });

  it("should throw an error if product is not found", async () => {
    const productRepository = MockRepository();
    productRepository.find.mockResolvedValue(null); // Simula produto não encontrado

    const updateProductUseCase = new UpdateProductUseCase(productRepository);

    const input = {
      id: "2",
      name: "Non-Existent Product",
      price: 200,
    };

    await expect(updateProductUseCase.execute(input)).rejects.toThrow(
      "Product not found"
    );
  });
});
