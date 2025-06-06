import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true }) email: string;
  @Prop({ type: String, required: true, select: false }) password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
