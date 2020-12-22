import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.schema';
import { LoginInput } from './types/auth.input';
import { AuthType } from './types/auth.types';


@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) { }

    async validateUser(data: LoginInput, ctx: any): Promise<AuthType | NotFoundException> {
        const user = await this.userService.getUserByUsername(data.username);
        if (!user) {
            return new NotFoundException('User not found');
        }

        const validatePassword = await bcrypt.compareSync(data.password, user.password);

        if (!validatePassword) {
            return new UnauthorizedException('Invalid Passwprd');
        }

        const token = await this.jwtToken(user);
        ctx.res.cookie('Authentication', token);

        // ctx.res.cookie({'Authentication': token, expires: '30'});

        return {
            user, token
        };
        


    }

    async jwtToken(user: User): Promise<string> {
        const { username, email, firstName, lastName } = user;
        const payload = { username, email, firstName, lastName };
        return this.jwtService.signAsync(payload);

    }
}
