import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import { Price, Info, Category } from './types/liquor.types';

export class ModelFeautres {
    _doc: any
}

export type LiquorDocument = Liquor & Document & ModelFeautres;

@ObjectType()
@Schema()
export class Liquor {

    @Field()
    @Prop()
    id: string;

    @Field({nullable: true})
    @Prop()
    img: string;

    @Field()
    @Prop({ type: Category })
    category: Category;

    @Field(() => Price)
    @Prop({ type: Price})
    price: Price;

    @Field()
    @Prop({ type: Info })
    info: Info;

}

export const LiquorSchema = SchemaFactory.createForClass(Liquor);