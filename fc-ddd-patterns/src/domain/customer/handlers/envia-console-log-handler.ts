import CustomerAddressChangedEvent from "../events/customer-address-changed-event";

export default class EnviaConsoleLogHandler {
  handle(event: CustomerAddressChangedEvent): void {
    console.log(
      `Endereço do cliente: ${event.id}, ${event.name} alterado para: ${event.address.street}, ${event.address.number}, ${event.address.zip}, ${event.address.city}`
    );
  }
}
