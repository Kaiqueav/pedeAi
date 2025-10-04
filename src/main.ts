import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './common/filters/http-execption.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   const corsOrigin = process.env.CORS_ORIGIN;
    if (corsOrigin) {
      
      const allowedOrigins = corsOrigin.split(',').map(origin => origin.trim());

      app.enableCors({
        origin: allowedOrigins,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
      });
    } else {
      app.enableCors(); 
    }
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, 
    forbidNonWhitelisted: true, 
    transform: true, 
  }));
   app.useGlobalFilters(new AllExceptionsFilter());
   const config = new DocumentBuilder()
    .setTitle('Pede Aí API')
    .setDescription('Documentação da API para o sistema de gestão de mesas.')
    .setVersion('1.0')
    .addBearerAuth() // Para endpoints protegidos
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
 await app.listen(process.env.PORT || 3000);
}
bootstrap();
