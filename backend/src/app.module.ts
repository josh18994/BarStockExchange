import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { LiquorModule } from './liquor/liquor.module';
import { OrderModule } from './order/order.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    LiquorModule,
    UserModule,
    GraphQLModule.forRoot({
      autoSchemaFile: './schema.gql',
      installSubscriptionHandlers: true,
      context: ({ req, res }) => ({ req, res }),
      cors: {
        credentials: true,
        origin: true
      }
    }),

    // Create file src/constants/personal.settings.ts and add mongo string connect as a enum
    MongooseModule.forRoot(process.env.MONGO_DB_CONNECT, { autoIndex: true, family: 4, useUnifiedTopology: true, keepAlive: true }),

    AuthModule,

    CartModule,

    OrderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
