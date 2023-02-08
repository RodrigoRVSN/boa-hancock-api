import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swaggerConfig } from './core/recipes/swagger.config';

async function bootstrap() {
  const PORT = process.env.PORT ?? 4444;

  const app = await NestFactory.create(AppModule);

  app.enableCors();

  swaggerConfig(app);

  await app.listen(PORT);
}
bootstrap();
