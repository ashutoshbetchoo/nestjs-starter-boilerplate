import { INestApplication, ValidationPipe } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import helmet from 'helmet';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { CacheService } from './../src/core/cache/cache.service';
import { DatabaseService } from './../src/database/database.service';

let app: INestApplication<App>;
let cacheService: CacheService;
let databaseService: DatabaseService;

beforeEach(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleFixture.createNestApplication();
  app.use(helmet());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  await app.init();

  cacheService = app.get<CacheService>(CacheService);
  databaseService = app.get<DatabaseService>(DatabaseService);
});

afterEach(async () => {
  await cacheService.clear();
  await databaseService.resetDatabase();
});

afterAll(async () => {
  await app.close();
});

export { app };
