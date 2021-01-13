import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/auth.guard';
import { CartService } from './cart.service';
import { UpdateCartInput } from './types/cart.input';
import { CartReturnType, Total } from './types/cart.types';



@Resolver()
export class CartResolver {
    constructor(private cartService: CartService) { }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => CartReturnType)
    async updateCart(
        @Args('productInfo') updateCartInput: UpdateCartInput,
        @Context() ctx
    ) {
        return this.cartService.updateCart(updateCartInput, ctx);
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => CartReturnType, { nullable: true })
    async getCartByUser(
        @Context() ctx
    ) {
        return this.cartService.getCartByUser(ctx.req.user._id);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Total)
    async calculateTotal(
        @Context() ctx
    ):Promise<Total> {
        return this.cartService.calculateTotal(ctx);
    }
}
