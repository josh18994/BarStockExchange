import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserService } from 'src/user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/user.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JWT_STRATEGY } from 'src/constants/personal.settings';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),

    PassportModule.register({ defaultStrategy: 'jwt', }),
    JwtModule.register({
      secret: JWT_STRATEGY,
      signOptions: {
        expiresIn: 3600,
      }
    }),
  ],
  providers: [AuthService, AuthResolver, UserService, JwtStrategy]
})
export class AuthModule { }

