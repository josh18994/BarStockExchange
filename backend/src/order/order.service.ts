import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UserService } from 'src/user/user.service';
import { Order, OrderDocument, Product } from './order.schema';
import { AddToOrderInput } from './types/order.input';


@Injectable()
export class OrderService {

    constructor(
        @InjectModel(Order.name)
        private orderModel: Model<OrderDocument>,
        private userService: UserService
    ) { }


    async addToOrder(addToOrderInput: AddToOrderInput, ctx): Promise<Order> {
        const { liquor: liquor_Id, quantity } = addToOrderInput;

        const user_Id  = ctx.req.user._id.toString();
        

        // check if order was created before\
        // const order2 = await this.orderModel.findOne({ user_Id }).populate('products.liquor');
        const order = await this.orderModel.findOne({ user_Id })
        if (order) {

            // console.log(order2.products[0].liquor_Id['price'].currentPrice)

            const productIndex = order.products.findIndex(x => x.liquor.toString() === liquor_Id);

            if (productIndex !== -1) {
                order.products[productIndex].quantity = Number(+order.products[productIndex].quantity + +quantity);

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

    async calculateTotal(liquorIds: [String]): Promise<String> {
        
        return '';
    }



}
