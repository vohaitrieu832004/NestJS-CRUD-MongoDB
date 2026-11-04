import { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
    collection: 'products',
    versionKey: false,
})
export class Products extends Document {
    @Prop({
        type: String,
        unique: true,
    })
    name: String;

    @Prop({
        type: Number,
    })
    price: Number;

    @Prop({
        type: Number,
    })
    quantity: Number;

    @Prop({
        type: Boolean,
    })
    status: Boolean;
}
export const ProductsSchema = SchemaFactory.createForClass(Products);
