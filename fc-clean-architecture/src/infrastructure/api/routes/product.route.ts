import express, { Request, Response } from "express";
import CreateProductUseCase from "../../../usecase/product/create/create-product.usecase";
import ListProductsUseCase from "../../../usecase/product/list/list-products.usecase";
import ProductRepository from "../../product/repository/sequelize/product.repository";

export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
  const usecase = new CreateProductUseCase(new ProductRepository());
  try {
    const productDto = {
      id: req.body.id,
      name: req.body.name,
      price: req.body.price,
    };
    const output = await usecase.execute(productDto);
    res.send(output);
  } catch (err) {
    const error = err as Error;
    res.status(500).send(error.message || "Unexpected error");
  }
});

productRoute.get("/", async (req: Request, res: Response) => {
  const usecase = new ListProductsUseCase(new ProductRepository());
  try {
    const output = await usecase.execute(); 
    res.send(output);
  } catch (err) {
    const error = err as Error;
    res.status(500).send(error.message || "Unexpected error");
  }
});
