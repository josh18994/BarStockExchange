import { UseGuards } from '@nestjs/common';
import { Args, Context, Field, Mutation, ObjectType, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/auth.guard';
import { Liquor } from 'src/liquor/liquor.schema';
import { Order } from './order.schema';
import { OrderService } from './order.service';
import { AddToOrderInput } from './types/order.input';

@ObjectType()
export class ProductPayload {
    @Field()
    quantity: Number;

    @Field(() => Liquor)
    liquor: Liquor
}


@Resolver()
export class OrderResolver {
    constructor(private orderService: OrderService) { }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Order)
    async addToOrder(
        @Args('productInfo') addToOrderInput: AddToOrderInput,
        @Context() ctx
    ) {
        return this.orderService.addToOrder(addToOrderInput, ctx);
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => Order, { nullable: true })
    async getOrderByUser(
        @Context() ctx
    ) {
        return this.orderService.getOrderByUser(ctx.req.user.username);
    }
}
