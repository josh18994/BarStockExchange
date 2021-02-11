import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, ObjectId, Types } from 'mongoose';
import { ModelFeautres } from 'src/liquor/liquor.schema';
import { ProductInfo, ProductItemSchema } from './types/order.types';


export type OrderDocument = Order & Document & ModelFeautres;
@ObjectType()
@Schema()
export class Order {

    @Field(() => ID)
    _id: ObjectId

    @Field()
    @Prop({ type: Types.ObjectId })
    user_Id: string;

    @Field(() => [ProductInfo])
    @Prop({ type: [ProductItemSchema], default: [] })
    products: ProductInfo[];

    @Field(() => Date)
    @Prop({ type: Date })
    date: Date

}

export const OrderSchema = SchemaFactory.createForClass(Order);

