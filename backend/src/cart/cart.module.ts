import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LiquorModule } from 'src/liquor/liquor.module';
import { UserModule } from 'src/user/user.module';
import { CartResolver } from './cart.resolver';
import { Cart, CartSchema } from './cart.schema';
import { CartService } from './cart.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cart.name, schema: CartSchema }]),
    LiquorModule,
    UserModule
],
  providers: [CartResolver, CartService],
  exports: [CartService]
})
export class CartModule {}
