import { pgTable, serial, text, timestamp, boolean } from 'drizzle-orm/pg-core';

export const talks = pgTable('talks', {
  id: serial('id').primaryKey(),
  time: text('time').notNull(),
  title: text('title').notNull(),
  speaker: text('speaker'),
  iconName: text('icon_name').notNull(),
  iconColor: text('icon_color').notNull(),
  current: boolean('current').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export type Talk = typeof talks.$inferSelect;
export type NewTalk = typeof talks.$inferInsert; 