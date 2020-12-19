import { Module } from '@nestjs/common';
import { LiquorModule } from './liquor/liquor.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { MONGO_DB_CONNECT } from './constants/personal.settings';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    LiquorModule,
    UserModule,
    GraphQLModule.forRoot({
      autoSchemaFile: './schema.gql',
      installSubscriptionHandlers: true,
      context: ({ req, res }) => ({ req, res })
    }),

    // Create file src/constants/personal.settings.ts and add mongo string connect as a enum
    MongooseModule.forRoot(MONGO_DB_CONNECT, { autoIndex: true, family: 4, useUnifiedTopology: true, keepAlive: true }),

    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
