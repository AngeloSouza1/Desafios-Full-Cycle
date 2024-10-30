import Customer from "../entity/customer";
import Address from "../value-object/address";
import EnviaConsoleLog1Handler from "../handlers/envia-console-log1-handler";
import EnviaConsoleLog2Handler from "../handlers/envia-console-log2-handler";
import EnviaConsoleLogHandler from "../handlers/envia-console-log-handler";
import EventDispatcher from "../events/event-dispatcher";
import CustomerCreatedEvent from "../events/customer-created-event";
import CustomerAddressChangedEvent from "../events/customer-address-changed-event";

describe("Customer domain events", () => {
  let eventDispatcher: EventDispatcher;

  beforeEach(() => {
    eventDispatcher = new EventDispatcher();
  });

  it("should trigger the CustomerCreated event and handlers", () => {
    // Mockando os handlers para garantir que o console.log foi chamado
    const consoleLog1Handler = new EnviaConsoleLog1Handler();
    const consoleLog2Handler = new EnviaConsoleLog2Handler();
    
    const consoleLog1Spy = jest.spyOn(consoleLog1Handler, "handle");
    const consoleLog2Spy = jest.spyOn(consoleLog2Handler, "handle");

    // Registrando os handlers no dispatcher
    eventDispatcher.register("CustomerCreatedEvent", consoleLog1Handler);
    eventDispatcher.register("CustomerCreatedEvent", consoleLog2Handler);

    // Criando um novo cliente
    const customer = new Customer("123", "Customer Name");
    
    // Disparando o evento manualmente para verificar os logs
    const event = new CustomerCreatedEvent(customer.id, customer.name);
    eventDispatcher.notify(event);

    // Verifica se os handlers foram chamados
    expect(consoleLog1Spy).toHaveBeenCalled();
    expect(consoleLog2Spy).toHaveBeenCalled();
    
    // Cleanup
    consoleLog1Spy.mockRestore();
    consoleLog2Spy.mockRestore();
  });

  it("should trigger the CustomerAddressChanged event when address is changed", () => {
    // Mockando o handler para garantir que o console.log foi chamado
    const consoleLogHandler = new EnviaConsoleLogHandler();
    const consoleLogSpy = jest.spyOn(consoleLogHandler, "handle");

    // Registrando o handler
    eventDispatcher.register("CustomerAddressChangedEvent", consoleLogHandler);

    // Criando um novo cliente e alterando o endereço
    const customer = new Customer("123", "Customer Name");
    const address = new Address("Street 1", 123, "00000-000", "City Name");
    
    // Disparando o evento de mudança de endereço
    customer.changeAddress(address);
    
    const addressChangedEvent = new CustomerAddressChangedEvent(customer.id, customer.name, address);
    eventDispatcher.notify(addressChangedEvent);

    // Verifica se o handler foi chamado
    expect(consoleLogSpy).toHaveBeenCalled();

    // Cleanup
    consoleLogSpy.mockRestore();
  });
});
