import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JWT_STRATEGY } from "src/constants/personal.settings";
import { User } from "src/user/user.schema";
import { UserService } from "src/user/user.service";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: JWT_STRATEGY
        });
    }

    public async validate(payload: {username: string}): Promise<User> {
        const user = await this.userService.getUserByUsername(payload.username);
        if(!user) throw new UnauthorizedException();
        return user;
    }

}