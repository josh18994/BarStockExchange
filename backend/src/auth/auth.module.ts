import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { User, UserSchema } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),

    PassportModule.register({ defaultStrategy: 'jwt', }),
    JwtModule.register({
      secret: process.env.JWT_STRATEGY,
      signOptions: {
        expiresIn: 3600,
      }
    }),
  ],
  providers: [AuthService, AuthResolver, UserService, JwtStrategy]
})
export class AuthModule { }
