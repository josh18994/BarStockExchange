import { Field, ObjectType } from '@nestjs/graphql';
import { Liquor } from 'src/liquor/liquor.schema';


@ObjectType()
export class ProductPayload {
    @Field()
    quantity: Number;

    @Field(() => Liquor)
    liquor: Liquor
}

@ObjectType()
export class Total {
    @Field()
    total: String;
}

@ObjectType()
export class OrderReturnType {
    @Field()
    user_Id: string;

    @Field(() => [ProductPayload])
    products: ProductPayload[];
}
