import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

@Schema()
export class User extends Document {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [String], enum: Role, default: [Role.USER] })
  roles: Role[];

  @Prop({ required: true })
  email: string;


}

export const UserSchema = SchemaFactory.createForClass(User);