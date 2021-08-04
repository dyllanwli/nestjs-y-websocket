import { NestFactory } from '@nestjs/core';
import { WsAdapter } from '@nestjs/platform-ws'; // ws adapter
import { RedisIoAdapter } from './adapters/redis-io.adapter'; // custom adapter
import { YwsAdapter } from './adapters/yws.adapter'; // custom adapter
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: false});
  // app.useWebSocketAdapter(new RedisIoAdapter(app));
  app.useWebSocketAdapter(new YwsAdapter(app));
  
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
