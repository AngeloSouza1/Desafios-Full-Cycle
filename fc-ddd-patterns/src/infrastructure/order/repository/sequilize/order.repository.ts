import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interface"; // Corrigido o caminho da interface
import Order from "../../../../domain/checkout/entity/order"; // Corrigido o caminho para o Order
import OrderItem from "../../../../domain/checkout/entity/order_item"; // Corrigido o caminho para OrderItem
import OrderItemModel from "./order-item.model"; // Modelo do Sequelize
import OrderModel from "./order.model"; // Modelo do Sequelize

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,  // Ajuste para 'customer_id' no modelo Sequelize
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,  // 'product_id' no modelo Sequelize
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }

  async update(entity: Order): Promise<void> {
    await OrderModel.update(
      {
        customer_id: entity.customerId,  // Ajuste para 'customer_id'
        total: entity.total(),
      },
      {
        where: { id: entity.id },
      }
    );

    await OrderItemModel.destroy({ where: { order_id: entity.id } });

    const items = entity.items.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      product_id: item.productId,  // Ajuste para 'product_id'
      quantity: item.quantity,
      order_id: entity.id,
    }));

    await OrderItemModel.bulkCreate(items);
  }

  async find(id: string): Promise<Order> {
    const orderModel = await OrderModel.findOne({
      where: { id },
      include: [{ model: OrderItemModel }],
    });

    if (!orderModel) {
      throw new Error("Order not found");
    }

    const orderItems = orderModel.items.map((item: OrderItemModel) =>
      new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity)  // Ajuste para 'product_id'
    );

    return new Order(orderModel.id, orderModel.customer_id, orderItems);  // Ajuste para 'customer_id'
  }

  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll({ include: [{ model: OrderItemModel }] });

    return orderModels.map((orderModel) => {
      const orderItems = orderModel.items.map((item: OrderItemModel) =>
        new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity)  // Ajuste para 'product_id'
      );

      return new Order(orderModel.id, orderModel.customer_id, orderItems);  // Ajuste para 'customer_id'
    });
  }
}
