import { InputType, Field } from "@nestjs/graphql";
import { IsNotEmpty, MinLength } from "class-validator";


@InputType()
export class LoginInput {
    @IsNotEmpty()
    @Field()
    username: string;

    @IsNotEmpty()
    @Field()
    @MinLength(5)
    password: string;
}