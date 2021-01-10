import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UserService } from 'src/user/user.service';
import { Order, OrderDocument, Product } from './order.schema';
import { UpdateOrderInput } from './types/order.input';
import { Total } from './types/order.types';


@Injectable()
export class OrderService {

    constructor(
        @InjectModel(Order.name)
        private orderModel: Model<OrderDocument>,
        private userService: UserService
    ) { }


    async updateOrder(updateOrderInput: UpdateOrderInput, ctx): Promise<Order> {
        const { liquor: liquor_Id, quantity } = updateOrderInput;
        const user_Id = ctx.req.user._id.toString();
        const order = await this.orderModel.findOne({ user_Id })
        if (order) {
            const productIndex = order.products.findIndex(x => x.liquor.toString() === liquor_Id);

            if (productIndex !== -1) {
                if (quantity === 0) {
                    order.products.splice(productIndex, 1);
                } else {
                    order.products[productIndex].quantity = quantity;
                }
            } else {
                order.products.push({
                    liquor: Types.ObjectId(liquor_Id),
                    quantity
                } as Product)
            }
            return order.save();
        }
        else {
            const newOrder = new this.orderModel(
                {
                    user_Id,
                    products: [
                        {
                            quantity,
                            liquor: Types.ObjectId(liquor_Id)
                        }
                    ]
                });
            return newOrder.save();

        }

    }


    async getOrderByUser(username: string): Promise<Order | NotFoundException> {
        const user = await this.userService.getUserByUsername(username);
        if (!user) {
            return new NotFoundException('User Not Found');
        }

        return this.orderModel.findOne({ user_Id: user._id.toString() });
    }

    async calculateTotal(ctx: any): Promise<Total> {
        const userOrderInfo = await this.orderModel
            .findOne({ user_Id: ctx.req.user._id.toString() })
            .populate('products.liquor', 'price.currentPrice -_id');
        const total = userOrderInfo.products.reduce((accumulator, x) => {
            // console.table(
            //     'current price: ' + +x.liquor['price'].currentPrice + 
            //     ' quantity: ' + x.quantity + 
            //     ' = ' + +x.liquor['price'].currentPrice * +x.quantity);
            return accumulator += +(+x.liquor['price'].currentPrice * +x.quantity);
        }, 0).toFixed(2).toString();
        return { total };
    }
}
