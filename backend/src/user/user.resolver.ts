import { Args, Mutation, Resolver, Query } from "@nestjs/graphql";
import { User } from "./user.schema";
import { UserService } from "./user.service";
import { CreateUserInput } from "./types/user.input";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "src/auth/auth.guard";


@Resolver()
export class UserResolver {

    constructor(
        private userService: UserService
    ) { }

    @Mutation(() => User)
    async createUser(
        @Args('inputCredentials') input: CreateUserInput
    ): Promise<User> {
        return this.userService.createUser(input);
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => [User])
    async getAllUsers(): Promise<User[]> {
        return this.userService.getAllUsers();
    }
}