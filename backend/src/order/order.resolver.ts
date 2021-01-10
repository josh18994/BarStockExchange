import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/auth.guard';
import { OrderService } from './order.service';
import { UpdateOrderInput } from './types/order.input';
import { OrderReturnType, Total } from './types/order.types';



@Resolver()
export class OrderResolver {
    constructor(private orderService: OrderService) { }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => OrderReturnType)
    async updateOrder(
        @Args('productInfo') updateOrderInput: UpdateOrderInput,
        @Context() ctx
    ) {
        return this.orderService.updateOrder(updateOrderInput, ctx);
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => OrderReturnType, { nullable: true })
    async getOrderByUser(
        @Context() ctx
    ) {
        return this.orderService.getOrderByUser(ctx.req.user._id);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Total)
    async calculateTotal(
        @Context() ctx
    ):Promise<Total> {
        return this.orderService.calculateTotal(ctx);
    }
}
