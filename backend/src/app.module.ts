import { Module } from '@nestjs/common';
import { LiquorModule } from './liquor/liquor.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { MONGO_DB_CONNECT } from './constants/personal.settings';

@Module({
  imports: [
    LiquorModule,
    GraphQLModule.forRoot({
      autoSchemaFile: './schema.gql',
      installSubscriptionHandlers: true,
    }),

    // Create file src/constants/personal.settings.ts and add mongo string connect as a enum
    MongooseModule.forRoot(MONGO_DB_CONNECT)
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
