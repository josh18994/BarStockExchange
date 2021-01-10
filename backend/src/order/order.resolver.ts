import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/auth.guard';
import { Order } from './order.schema';
import { OrderService } from './order.service';
import { UpdateOrderInput } from './types/order.input';
import { Total } from './types/order.types';

@Resolver()
export class OrderResolver {
    constructor(private orderService: OrderService) { }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Order)
    async updateOrder(
        @Args('productInfo') updateOrderInput: UpdateOrderInput,
        @Context() ctx
    ) {
        return this.orderService.updateOrder(updateOrderInput, ctx);
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => Order, { nullable: true })
    async getOrderByUser(
        @Context() ctx
    ) {
        return this.orderService.getOrderByUser(ctx.req.user.username);
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => Total)
    async calculateTotal(
        @Context() ctx
    ) {
        return this.orderService.calculateTotal(ctx);
    }
}
