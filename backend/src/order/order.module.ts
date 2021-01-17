import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderResolver } from './order.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './order.schema';
import { LiquorService } from 'src/liquor/liquor.service';
import { Liquor, LiquorSchema } from 'src/liquor/liquor.schema';
import { CartService } from 'src/cart/cart.service';
import { Cart, CartSchema } from 'src/cart/cart.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: Liquor.name, schema: LiquorSchema },
      { name: Cart.name, schema: CartSchema }
    ])
  ],
  providers: [OrderService, OrderResolver, LiquorService, CartService]
})
export class OrderModule { }
