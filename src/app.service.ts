import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from './core/logger/logger.service';
import { DatabaseService } from './database/database.service';
import { CacheService } from './core/cache/cache.service';

@Injectable()
export class AppService {
  constructor(
    private readonly configService: ConfigService,
    private readonly logger: LoggerService,
    private readonly databaseService: DatabaseService,
    private readonly cacheService: CacheService,
  ) {}

  async getHello(): Promise<string> {
    const envVariable = this.configService.getOrThrow<string>(`environment`);

    this.logger.log('Calling from inside getHello', 'AppService', {
      envVariable,
    });

    await this.cacheService.set('key', 'VALUE FROM CACHE', 1000);
    const val = await this.cacheService.get('key');
    console.log(val);

    return 'Hello World!';
  }
}
