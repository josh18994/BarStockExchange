import { ValidationPipe } from "@nestjs/common";
import { Args, Context, Field, Mutation, ObjectType, Query, Resolver, Subscription } from "@nestjs/graphql";
import { PubSub } from "graphql-subscriptions";
import { Liquor } from "src/liquor/liquor.schema";
import { LiquorInput } from "./types/liquor.input";
import { LiquorService } from "./liquor.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "src/auth/auth.guard";

const pubSub = new PubSub();
const LIQUOR_ADDED = 'liquorAddedSuccessfully';

@ObjectType()
export class TestLiquorOutput {
    @Field()
    message: string;
}
@Resolver()
export class LiquorResolver {
    constructor(
        private liquorService: LiquorService
    ) { }

    //TODO: Make sure only admin can make changes to database

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Liquor)
    async createLiquor(
        @Args('options', ValidationPipe) options: LiquorInput,
        @Context() ctx,
    ): Promise<Liquor> {
        if(ctx.req.user.username !== 'admin') {
            console.log('You do not have required permissions, Login as admin to perform action');
        }
        console.log(ctx.req);
        const liquor = await this.liquorService.createLiquor(options);
        pubSub.publish(LIQUOR_ADDED, { updatedLiquorList: liquor });
        return liquor;
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Liquor, { nullable: true })
    async updateLiquor(
        @Args('options', ValidationPipe) options: LiquorInput,
        @Args('id') id: string,
        @Context() ctx,
    ): Promise<Liquor | void> {
        console.log(ctx.req.user);
        if(ctx.req.user.username !== 'admin') {
            console.log('You do not have required permissions, Login as admin to perform action');
        }
        const liquor = await this.liquorService.updateLiquor(options, id);
        if (liquor) {
            pubSub.publish(LIQUOR_ADDED, { updatedLiquorList: liquor });
        }
        return liquor;
    }

    @Query(() => [Liquor])
    getAllLiquor(): Promise<Liquor[]> {
        return this.liquorService.getAllLiquor();
    }

    @Query(() => Liquor)
    getLiquorById(@Args('id') id: string): Promise<Liquor | Error> {
        return this.liquorService.getLiquorById(id);
    }

    @Subscription(() => Liquor)
    updatedLiquorList() {
        return pubSub.asyncIterator(LIQUOR_ADDED);
    }

}