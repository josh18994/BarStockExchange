import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

@InputType()
export class CreateUserInput {

    @IsNotEmpty()
    @Field()
    firstName: string;

    @IsNotEmpty()
    @Field()
    lastName: string;

    @IsNotEmpty()
    @IsEmail()
    @Field()
    email: string;

    @MinLength(5)
    @IsNotEmpty()
    @Field()
    username: string;

    @IsNotEmpty()
    @Field()
    @MinLength(5)
    password: string;

}