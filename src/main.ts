import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { auth } from 'express-openid-connect'
import { configAuth0 } from './auth0config';



const PORT = process.env.port || 3000;



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  app.use(auth(configAuth0))
  const config = new DocumentBuilder()
    .setTitle('Event CMS')
    .addTag('info')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app,config);
  SwaggerModule.setup('api',app,document)

  await app.listen(PORT, ()=>{console.log(`Server started on ${PORT}`)});
}
bootstrap();
