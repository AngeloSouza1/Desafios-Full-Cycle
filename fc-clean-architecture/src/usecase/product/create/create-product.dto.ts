// src/usecase/product/create/create-product.dto.ts

export interface CreateProductInputDto {
  id: string;
  name: string;
  price: number;
}

export interface CreateProductOutputDto {
  id: string;
  name: string;
  price: number;
}
