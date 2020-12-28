import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LiquorModule } from 'src/liquor/liquor.module';
import { UserModule } from 'src/user/user.module';
import { OrderResolver } from './order.resolver';
import { Order, OrderSchema } from './order.schema';
import { OrderService } from './order.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    LiquorModule,
    UserModule
],
  providers: [OrderResolver, OrderService],
  exports: [OrderService]
})
export class OrderModule {}
