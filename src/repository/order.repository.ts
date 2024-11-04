import { AppDataSource } from "../data-source"; 
import { Order, OrderStatus } from "../entity/order";
export class OrderRepository{

    
    async createOrder(data: string, status: OrderStatus) {
        const orderRepository = AppDataSource.getRepository(Order);
      
        const newOrder = orderRepository.create({
          data,
          status,
        });
      
        await orderRepository.save(newOrder);
        console.log("Order created:", newOrder);
        return newOrder;
      }

      async updateOrder(orderId: string, newData: Partial<Order>) {
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
      
        await orderRepository.save(order);
        console.log("Order updated:", order);
        return order;
      }

      async deleteOrder(orderId: string) {
        const orderRepository = AppDataSource.getRepository(Order);
      
        const order = await orderRepository.findOneBy({ id: orderId });
        if (!order) {
          throw new Error("Order not found");
        }
      
        await orderRepository.softRemove(order);
        console.log("Order soft deleted:", order);
        return order;
      }
}