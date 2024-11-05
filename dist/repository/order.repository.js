"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRepository = void 0;
const data_source_1 = require("../data-source");
const order_1 = require("../entity/order");
class OrderRepository {
    create(data, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const orderRepository = data_source_1.AppDataSource.getRepository(order_1.Order);
            const newOrder = orderRepository.create({
                data,
                status,
            });
            yield orderRepository.save(newOrder);
            return newOrder;
        });
    }
    update(orderId, newData) {
        return __awaiter(this, void 0, void 0, function* () {
            const orderRepository = data_source_1.AppDataSource.getRepository(order_1.Order);
            const order = yield orderRepository.findOneBy({ id: orderId });
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
            yield orderRepository.save(order);
            return order;
        });
    }
    delete(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            const orderRepository = data_source_1.AppDataSource.getRepository(order_1.Order);
            const order = yield orderRepository.findOneBy({ id: orderId });
            if (!order) {
                throw new Error("Order not found");
            }
            yield orderRepository.softRemove(order);
            return order;
        });
    }
    findOne(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            const orderRepository = data_source_1.AppDataSource.getRepository(order_1.Order);
            return yield orderRepository.findOneBy({ id: orderId });
        });
    }
}
exports.OrderRepository = OrderRepository;
