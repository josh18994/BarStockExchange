import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/auth.guard';
import { OrderService } from './order.service';
import { ProductInfoInput } from './types/order.input';

@Resolver()
export class OrderResolver {

    constructor(private orderService: OrderService) { }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => String)
    async checkoutUserCart(
        @Context() ctx,
        @Args({ name: 'products', type: () => [ProductInfoInput] }) productInfoInput: ProductInfoInput[]
    ) {
        return this.orderService.checkoutUserCart(ctx, productInfoInput);
    }

}
