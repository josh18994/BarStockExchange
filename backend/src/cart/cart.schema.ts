import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from 'mongoose';
import { Liquor } from 'src/liquor/liquor.schema';

// _______________________ProductSchema____________________________


@Schema()
@ObjectType()
export class Product extends Document {

    @Field()
    @Prop()
    quantity: Number;

    @Field(() => ID)
    @Prop({ type: Types.ObjectId, ref: Liquor.name })
    liquor: Types.ObjectId;

}

export const ProductSchema = SchemaFactory.createForClass(Product);


//__________________________________________________________________

export class ModelFeautres {
    _doc: any
}

export type CartDocument = Cart & Document & ModelFeautres;

@ObjectType()
@Schema()
export class Cart {

    @Field()
    @Prop({ type: Types.ObjectId })
    user_Id: string;

    @Field(() => [Product])
    @Prop({ type: [ProductSchema], default: [] })
    products: Product[];

}


export const CartSchema = SchemaFactory.createForClass(Cart);