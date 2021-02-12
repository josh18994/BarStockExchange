import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Product } from "src/cart/cart.schema";

@Schema()
@ObjectType()
export class ProductInfo extends Product {
    @Field()
    @Prop()
    price: string;
}

export const ProductItemSchema = SchemaFactory.createForClass(ProductInfo);