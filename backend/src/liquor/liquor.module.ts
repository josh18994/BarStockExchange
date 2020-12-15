import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Liquor, LiquorSchema } from 'src/liquor/liquor.schema';
import { LiquorResolver } from './liquor.resolver';
import { LiquorService } from './liquor.service';

@Module({
  imports:[MongooseModule.forFeature([{name: Liquor.name, schema: LiquorSchema}])],
  providers: [LiquorService, LiquorResolver]
})
export class LiquorModule { }
