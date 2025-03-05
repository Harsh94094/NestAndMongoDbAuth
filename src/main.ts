import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 
  const config = new DocumentBuilder()
  .setTitle('News App')
  .setDescription('News Api')
  .setVersion('1.0.0')
  .addBearerAuth(
    { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 
    'access-token',
  )
  .addSecurityRequirements('access-token')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  app.useGlobalPipes(new ValidationPipe({ forbidUnknownValues: false }));
  
  SwaggerModule.setup('api', app, document);
     await app.listen(5000, '0.0.0.0');
}
bootstrap();
