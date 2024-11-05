import { AppDataSource } from "../data-source"; 
import { Order, OrderStatus } from "../entity/order";
export class OrderRepository{

    
    async create(data: string, status: OrderStatus) : Promise<Order> {
        const orderRepository = AppDataSource.getRepository(Order);
      
        const newOrder = orderRepository.create({
          data,
          status,
        });
      
        await orderRepository.save(newOrder);

        return newOrder;
      }

      async update(orderId: string, newData: Partial<Order>) {
        const orderRepository = AppDataSource.getRepository(Order);
      
        const order = await orderRepository.findOneBy({ id: orderId });
        if (!order) {
          throw new Error("Order not found");
        }
      
        if (newData.data) {
          order.data = newData.data;
        }
        if (newData.status) {
          order.status = newData.status;
        }
        if (newData.dataError) {
          order.dataError = newData.dataError;
        }
      
        await orderRepository.save(order);

        return order;
      }

      async delete(orderId: string) {
        const orderRepository = AppDataSource.getRepository(Order);
      
        const order = await orderRepository.findOneBy({ id: orderId });
        if (!order) {
          throw new Error("Order not found");
        }
      
        await orderRepository.softRemove(order);

        return order;
      }

      async findOne(orderId: string) : Promise<Order|null>{
        const orderRepository = AppDataSource.getRepository(Order);
      
        return await orderRepository.findOneBy({ id: orderId });
      }

}