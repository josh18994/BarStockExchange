import { ValidationPipe } from "@nestjs/common";
import { Args, Field, Mutation, ObjectType, Query, Resolver, Subscription } from "@nestjs/graphql";
import { PubSub } from "graphql-subscriptions";
import { Liquor } from "src/liquor/liquor.schema";
import { LiquorInput } from "./types/liquor.input";
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
        @Args('options', ValidationPipe) options: LiquorInput
    ): Promise<Liquor> {
        const liquor = await this.liquorService.createLiquor(options);
        pubSub.publish(LIQUOR_ADDED, { updatedLiquorList: liquor });
        return liquor;
    }

    @Mutation(() => Liquor, {nullable: true})
    async updateLiquor(
        @Args('options', ValidationPipe) options: LiquorInput,
        @Args('id') id: string
    ): Promise<Liquor | void> {
        const liquor = await this.liquorService.updateLiquor(options, id);
        if(liquor) {
            pubSub.publish(LIQUOR_ADDED, { updatedLiquorList: liquor });
        }
        return liquor;
    }

    @Query(() => [Liquor])
    getAllLiquor(): Promise<Liquor[] | undefined> {
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
