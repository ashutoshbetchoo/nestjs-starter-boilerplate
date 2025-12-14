import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { DatabaseService } from './database/database.service';

@Module({
  imports: [CoreModule],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
