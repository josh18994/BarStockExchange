import { Module } from '@nestjs/common';
import { LiquorModule } from './liquor/liquor.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    LiquorModule,
    GraphQLModule.forRoot({
      autoSchemaFile: './schema.gql',
      installSubscriptionHandlers: true,
    }),
    MongooseModule.forRoot('mongodb+srv://joshua:enqzElyXMVy6KYJY@cluster0.huuxj.mongodb.net/liquor?retryWrites=true&w=majority')
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
