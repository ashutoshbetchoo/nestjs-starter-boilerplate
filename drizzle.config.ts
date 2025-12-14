import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';
import * as dotenvExpand from 'dotenv-expand';

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
