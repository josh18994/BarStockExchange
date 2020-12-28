import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, ObjectId } from 'mongoose';


export class ModelFeautres {
    _doc: any
}

export type UserDocument = User & Document & ModelFeautres;

@ObjectType()
@Schema()
export class User {

    @Field()
    @Prop()
    firstName: string;

    @Field()
    @Prop()
    lastName: string;

    @Field()
    @Prop({ unique: true })
    username: string;

    @Field()
    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop()
    salt: string;

    @Field(() => ID)
    _id: ObjectId

}

export const UserSchema = SchemaFactory.createForClass(User);
