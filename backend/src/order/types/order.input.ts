import { Field, InputType } from "@nestjs/graphql";


@InputType()
export class ProductInfoInput {

    @Field()
    quantity: string;

    @Field()
    liquor: string;

    @Field()
    price: string;

}