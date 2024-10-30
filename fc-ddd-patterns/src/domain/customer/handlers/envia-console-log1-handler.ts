import CustomerCreatedEvent from "../events/customer-created-event";

export default class EnviaConsoleLog1Handler {
  handle(event: CustomerCreatedEvent): void {
    console.log("Esse é o primeiro console.log do evento: CustomerCreated");
  }
}
