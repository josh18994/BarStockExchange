import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Resolver, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from './types/auth.input';
import { AuthType } from './types/auth.types';

@Resolver()
export class AuthResolver {
    constructor(private authService: AuthService) {}


    @Mutation(() => AuthType)
    async login(
        @Args('inputCredentials') input: LoginInput,
        @Context() ctx,
    ): Promise<AuthType | NotFoundException>{
        
        return this.authService.validateUser(input, ctx);
    }
}
