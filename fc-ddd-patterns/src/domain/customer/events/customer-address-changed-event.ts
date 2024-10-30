import Address from "../value-object/address";

export default class CustomerAddressChangedEvent {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly address: Address
  ) {}
}
