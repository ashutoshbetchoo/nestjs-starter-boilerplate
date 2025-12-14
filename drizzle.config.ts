import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';
import * as dotenvExpand from 'dotenv-expand';

// since it is outside NestJS, need to import the .env
// needs to expand so that interpolation can be done
const myEnv = dotenv.config();
dotenvExpand.expand(myEnv);

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/database/schema',
  out: './drizzle',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
