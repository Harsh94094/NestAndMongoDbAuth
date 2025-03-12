import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Image extends Document {
  @Prop()
  filename: string;

  @Prop()
  modelName: string;

  @Prop()
  triggerWord: string;

  @Prop()
  originalUrl: string;

  @Prop()
  convertedUrl: string;
}

export const ImageSchema = SchemaFactory.createForClass(Image);
