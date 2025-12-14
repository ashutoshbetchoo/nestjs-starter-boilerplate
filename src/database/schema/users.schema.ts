import { pgTable, varchar, timestamp, serial } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  //   id: integer().primaryKey().generatedAlwaysAsIdentity(),
  id: serial().primaryKey(),
  email: varchar(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp(),
});
