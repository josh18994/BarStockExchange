import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CartService } from 'src/cart/cart.service';
import { LiquorService } from 'src/liquor/liquor.service';
import { Order, OrderDocument } from './order.schema';
import { ProductInfoInput } from './types/order.input';

@Injectable()
export class OrderService {

    constructor(
        @InjectModel(Order.name)
        private orderModel: Model<OrderDocument>,
        private liquorService: LiquorService,
        private cartService: CartService
    ) { }

    async checkoutUserCart(ctx, productInfoInput: ProductInfoInput[]) {
        const liquors = await this.liquorService.getAllLiquor({ pageSize: '50', pageNum: '1', search: '', filter: '' });
        productInfoInput.forEach(product => {
            const liquorItemInDb = liquors.data.filter(x => x._id.toString() === product.liquor)[0];
            if (product.price !== liquorItemInDb.price.currentPrice) {
                throw new InternalServerErrorException(`Price has changed for item: ${liquorItemInDb.info.name}`)
            }
        });
        const order = new this.orderModel({
            user_Id: ctx.req.user._id,
            products: productInfoInput,
            date: new Date()
        });

        const saveOrder = await order.save();

        if (saveOrder) {
            await this.cartService.emptyCart(ctx.req.user._id);
        }

        return 'Checkout Success';

    }

}
