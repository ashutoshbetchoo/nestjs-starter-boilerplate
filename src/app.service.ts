import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from './core/logger/logger.service';

@Injectable()
export class AppService {
  constructor(
    private readonly configService: ConfigService,
    private readonly logger: LoggerService,
  ) {}

  getHello(): string {
    const envVariable = this.configService.getOrThrow<string>(`environment`);

    this.logger.log('Calling from inside getHello', 'AppService', {
      envVariable,
    });

    return 'Hello World!';
  }
}
