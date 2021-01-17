import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UpdateCartInput {

    @Field(() => String, {nullable: false})
    liquor: string;

    @Field({nullable: false})
    quantity: Number;

}