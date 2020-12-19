import { User } from "src/user/user.schema";
import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class AuthType {
    @Field()
    user: User;

}