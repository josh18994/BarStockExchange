import { UseGuards } from "@nestjs/common";
import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GqlAuthGuard } from "src/auth/auth.guard";
import { CreateUserInput } from "./types/user.input";
import { User } from "./user.schema";
import { UserService } from "./user.service";


@Resolver(() => User)
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

    @UseGuards(GqlAuthGuard)
    @Query(() => User, {nullable: true})
    async authenticateCookie(
        @Context() ctx
    ): Promise<User> {
        return ctx.req.user;
    }

    // @UseGuards(GqlAuthGuard)
    @Query(() => Boolean)
    async checkUserExists(
        @Args('username') username: string
    ): Promise<Boolean> {
        const user = await this.userService.getUserByUsername(username);
        if(user) return true;
        else return false;
    }
}