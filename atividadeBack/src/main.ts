import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { databaseProviders } from './modules/database/ormconfig.providers';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log(databaseProviders[0].useFactory.toString());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
