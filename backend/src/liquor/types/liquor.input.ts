import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class InfoType {

    @Field({ nullable: true })
    name: string;

    @Field({ nullable: true })
    year: string;

    @Field({nullable: true})
    abv: string;

}

@InputType()
export class CategoryType {

    @IsNotEmpty()
    @Field()
    categoryId: string;

    @IsOptional()
    @Field({nullable: true})
    categoryType: string;

}

@InputType()
export class PriceHistoryType {

    @Field()
    price: string;

    @Field()
    date: Date;

}

@InputType()
export class PriceType {

    @IsNotEmpty()
    @Field()
    currentPrice: string;

    @IsOptional()
    @Field(() => [PriceHistoryType], { nullable: true })
    history?: PriceHistoryType[]

}

@InputType()
export class LiquorInput {

    @Field({ nullable: true })
    img: string;


    @Field(() => CategoryType, { nullable: true })
    category: CategoryType;

    @Field(() => PriceType, { nullable: true })
    price: PriceType


    @Field(() => InfoType, { nullable: true })
    info: InfoType

    @Field({ nullable: true })
    frequency: Number
}

@InputType()
export class LiquorQueriesInput {

    @Field()
    pageSize: string;

    @Field()
    pageNum: string;

    @Field({ nullable: true })
    search: string;

    @Field({ nullable: true })
    filter: string;

}