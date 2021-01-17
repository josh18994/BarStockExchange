import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Cart, CartDocument, Product } from './cart.schema';
import { UpdateCartInput } from './types/cart.input';
import { Total } from './types/cart.types';


@Injectable()
export class CartService {

    constructor(
        @InjectModel(Cart.name)
        private cartModel: Model<CartDocument>
    ) { }


    async updateCart(updateCartInput: UpdateCartInput, ctx): Promise<Cart> {
        const { liquor: liquor_Id, quantity } = updateCartInput;
        const user_Id = ctx.req.user._id.toString();
        const cart = await this.cartModel.findOne({ user_Id });
        if (cart) {
            const productIndex = cart.products.findIndex(x => x.liquor.toString() === liquor_Id);
            if (productIndex !== -1) {
                if (quantity === 0) {
                    cart.products.splice(productIndex, 1);
                } else {
                    cart.products[productIndex].quantity = quantity;
                }
            } else {
                cart.products.push({
                    liquor: Types.ObjectId(liquor_Id),
                    quantity
                } as Product)
            }
            await cart.save();

        }
        else {
            const newCart = new this.cartModel(
                {
                    user_Id,
                    products: [
                        {
                            quantity,
                            liquor: Types.ObjectId(liquor_Id)
                        }
                    ]
                });
            await newCart.save();

        }

        return this.getCartByUser(ctx.req.user._id);

    }


    async getCartByUser(_id) {
        return this.cartModel
            .findOne({ user_Id: _id.toString() })
            .populate('products.liquor');
    }

    async calculateTotal(ctx: any): Promise<Total> {
        const userCartInfo = await this.getCartByUser(ctx.req.user._id);
        let total = '';
        if (userCartInfo) {
            total = userCartInfo.products.reduce((accumulator, x) => {
                // console.table(
                //     'current price: ' + +x.liquor['price'].currentPrice + 
                //     ' quantity: ' + x.quantity + 
                //     ' = ' + +x.liquor['price'].currentPrice * +x.quantity);
                return accumulator += +(+x.liquor['price'].currentPrice * +x.quantity);
            }, 0).toFixed(2).toString();
        }
        return { total };
    }

    async emptyCart(_id): Promise<void> {
        await this.cartModel.updateOne({user_Id: _id.toString()}, { $set: {products: []}});
    }
}
