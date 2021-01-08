import { ObjectType, Field } from "@nestjs/graphql";
import { Liquor } from "../liquor.schema";

@ObjectType()
export class Category{

    @Field()
    categoryId: string;

    @Field()
    categoryType: string;
}

@ObjectType()
export class PriceHistory {

    @Field()
    price: string;

    @Field()
    date: Date;

}

@ObjectType()
export class Price {

    @Field()
    currentPrice: string;

    @Field(() => [PriceHistory], {nullable: true})
    history?: PriceHistory[]

}

@ObjectType()
export class Info {

    @Field()
    name: string;

    @Field({nullable: true})
    year: string;

    @Field({nullable: true})
    abv: string;

}


@ObjectType()
export class GetAllLiquorReturnData {

    @Field(() => [Liquor], {nullable: true})
    data: Liquor[] | [];

    @Field()
    total: string;
}

