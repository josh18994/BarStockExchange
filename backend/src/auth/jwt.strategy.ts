import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from "src/user/user.schema";
import { UserService } from "src/user/user.service";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    
    constructor(
        private userService: UserService) {
        super({
            // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            jwtFromRequest: ExtractJwt.fromExtractors([(request) => {
                const jwtTokenFromCookie = request.rawHeaders.filter((x:string) => x.startsWith('Authentication'))[0];
                return jwtTokenFromCookie.slice(15);
              }]),
            secretOrKey: process.env.JWT_STRATEGY
        });
    }

    public async validate(payload: {username: string}): Promise<User> {
        const user = await this.userService.getUserByUsername(payload.username);
        if(!user) throw new UnauthorizedException();
        return user;
    }

}