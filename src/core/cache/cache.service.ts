import { Injectable, OnModuleDestroy } from '@nestjs/common';
import Keyv from 'keyv';
import KeyvRedis from '@keyv/redis';
import { LoggerService } from '../logger/logger.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CacheService implements OnModuleDestroy {
  private keyv: Keyv;

  constructor(
    private readonly config: ConfigService,
    private readonly logger: LoggerService,
  ) {
    const redisUrl = this.config.get<string>('REDIS_URL');

    const redis = new KeyvRedis(redisUrl);

    this.keyv = new Keyv({
      store: redis,
      throwOnErrors: true,
      ttl: 60000,
    });

    this.keyv.on('error', (err: Error) => {
      this.logger.error('Cache connection error:', err.message, 'CacheService');
    });
  }

  /**
   * Get a value from cache
   */
  async get<T>(key: string): Promise<T | undefined> {
    try {
      return await this.keyv.get(key);
    } catch (error) {
      this.logger.error(`Error getting key ${key}:`, error);
      return undefined;
    }
  }

  /**
   * Set a value in cache with optional TTL (in milliseconds)
   */
  async set<T>(key: string, value: T, ttl?: number): Promise<boolean> {
    try {
      await this.keyv.set(key, value, ttl);
      return true;
    } catch (error) {
      this.logger.error(`Error setting key ${key}:`, error);
      return false;
    }
  }

  /**
   * Delete a key from cache
   */
  async delete(key: string): Promise<boolean> {
    try {
      return await this.keyv.delete(key);
    } catch (error) {
      this.logger.error(`Error deleting key ${key}:`, error);
      return false;
    }
  }

  /**
   * Clear all keys in the namespace
   */
  async clear(): Promise<void> {
    try {
      await this.keyv.clear();
    } catch (error) {
      this.logger.error('Error clearing cache:', error);
    }
  }

  /**
   * Check if a key exists
   */
  async has(key: string): Promise<boolean> {
    try {
      const value: unknown = await this.keyv.get(key);
      return value !== undefined;
    } catch (error) {
      this.logger.error(`Error checking key ${key}:`, error);
      return false;
    }
  }

  /**
   * Get or set pattern - fetch from cache or compute and store
   */
  async getOrSet<T>(
    key: string,
    factory: () => Promise<T>,
    ttl?: number,
  ): Promise<T> {
    const cached: T | undefined = await this.get<T>(key);

    if (cached !== undefined) {
      return cached;
    }

    const value: T = await factory();
    await this.set(key, value, ttl);
    return value;
  }

  async onModuleDestroy(): Promise<void> {
    await this.keyv.disconnect();
  }
}
