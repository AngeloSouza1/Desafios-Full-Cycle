import Notification from "../../@shared/notification/notification";
import NotificationError from "../../@shared/notification/notification.error";
import ProductInterface from "./product.interface";
import ProductValidator from "../validator/product.validator";

export default class Product implements ProductInterface {
  private _id: string;
  private _name: string;
  private _price: number;
  public notification: Notification;

  constructor(id: string, name: string, price: number) {
    this._id = id;
    this._name = name;
    this._price = price;
    this.notification = new Notification();
    this.validate();

    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
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
    this._name = name;
    this.validate();

    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  changePrice(price: number): void {
    this._price = price;
    this.validate();

    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  private validate(): void {
    const validator = new ProductValidator();
    validator.validate(this);
  }
}
