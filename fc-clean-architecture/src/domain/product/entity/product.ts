import ProductInterface from "./product.interface";

export default class Product implements ProductInterface {
  private _id: string;
  private _name: string;
  private _price: number;

  constructor(id: string, name: string, price: number) {
    this._id = id;
    this._name = name;
    this._price = price;
    this.validate();
  }

  get id(): string {
    return this._id;
  }
  
  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price;
  }

  changeName(name: string): void {
    if (!name) {
      throw new Error("Name is required");
    }
    this._name = name;
  }

  changePrice(price: number): void {
    if (price < 0) {
      throw new Error("Price must be greater than zero");
    }
    this._price = price;
  }

  private validate(): void {
    if (!this._id) {
      throw new Error("Id is required");
    }
    if (!this._name) {
      throw new Error("Name is required");
    }
    if (this._price < 0) {
      throw new Error("Price must be greater than zero");
    }
  }
}
