import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.schema';
import { LoginInput } from './types/auth.input';
import { AuthType } from './types/auth.types';
import { LIQUOR_PRICE_CHANGER_USERNAME } from 'src/constants/personal.settings';


@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) { }

    async validateUser(data: LoginInput, ctx: any): Promise<AuthType | NotFoundException> {
        const user = await this.userService.getUserByUsername(data.username);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        const validatePassword = await bcrypt.compareSync(data.password, user.password);

        if (!validatePassword) {
            throw new UnauthorizedException('Invalid Password');
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
        if (username === LIQUOR_PRICE_CHANGER_USERNAME) {
            return this.jwtService.signAsync(payload, { expiresIn: '366d' });
        }
        return this.jwtService.signAsync(payload);

    }
}
