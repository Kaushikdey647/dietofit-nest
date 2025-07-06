import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import 'dotenv/config';

const APP_TITLE = process.env.APP_TITLE || "Diet o'Fits API";
const APP_DESCRIPTION =
  process.env.APP_DESCRIPTION || "API documentation for Diet o'Fits";
const APP_VERSION = process.env.APP_VERSION || '1.0';
const PORT = process.env.PORT ? +process.env.PORT : 3001;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Enable CORS
  app.enableCors({
    origin: 'http://localhost:3000', // where your frontend runs
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true, // optional if you use cookies
  });

  const config = new DocumentBuilder()
    .setTitle(APP_TITLE)
    .setDescription(APP_DESCRIPTION)
    .setVersion(APP_VERSION)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT);
}
bootstrap();
