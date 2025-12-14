import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from './schema';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  public db: NodePgDatabase<typeof schema>;
  private pool: Pool;

  constructor(private readonly config: ConfigService) {}

  onModuleInit() {
    const databaseUrl = this.config.get<string>('DATABASE_URL');

    if (!databaseUrl) {
      throw new Error('DATABASE_URL is not defined');
    }

    this.pool = new Pool({
      connectionString: databaseUrl,
    });

    this.db = drizzle(this.pool, { schema });
  }

  async onModuleDestroy() {
    await this.pool?.end();
  }
}
