import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { YjsModule } from './yjs/yjs.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [EventsModule, YjsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
