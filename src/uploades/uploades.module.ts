import { Module } from '@nestjs/common';

import { UploadController } from './uploades.controller';
import { MulterModule } from '@nestjs/platform-express';
import { MongooseModule } from '@nestjs/mongoose';
import { Image, ImageSchema } from './images.entity';

import { UploadsService } from './uploades.service';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads', 
    }),
    MongooseModule.forFeature([{ name: Image.name, schema: ImageSchema }]),
  ],
  controllers: [UploadController],
  providers: [UploadsService],
})
export class UploadModule {}
