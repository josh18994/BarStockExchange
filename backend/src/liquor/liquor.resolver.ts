import { ValidationPipe } from "@nestjs/common";
import { Args, Field, Mutation, ObjectType, Query, Resolver, Subscription } from "@nestjs/graphql";
import { PubSub } from "graphql-subscriptions";
import { Liquor } from "src/liquor/liquor.schema";
import { CreateLiquorInput } from "./types/liquor.input";
import { LiquorService } from "./liquor.service";

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

    @Mutation(() => Liquor)
    async createLiquor(
        @Args('options', ValidationPipe) options: CreateLiquorInput,
    ): Promise<Liquor> {
        const liquor = await this.liquorService.createLiquor(options);
        pubSub.publish(LIQUOR_ADDED, { updatedLiquorList: liquor });
        return liquor;
    }

    @Query(() => [Liquor])
    getAllLiquor(): Promise<Liquor[] | undefined> {
        return this.liquorService.getAllLiquor();
    }

    @Subscription(() => Liquor)
    updatedLiquorList() {
        return pubSub.asyncIterator(LIQUOR_ADDED);
    }
}
