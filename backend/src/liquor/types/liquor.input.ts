import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class InfoType {

    @IsNotEmpty()
    @Field()
    name: string;

    @Field({ nullable: true })
    year: string;

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

    @IsNotEmpty()
    @Field(() => CategoryType)
    category: CategoryType;

    @Field(() => PriceType, { nullable: true })
    price: PriceType


    @Field()
    info: InfoType

}