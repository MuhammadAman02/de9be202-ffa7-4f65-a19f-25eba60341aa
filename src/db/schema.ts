import { pgTable, text, uuid, timestamp, numeric, boolean } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const shoes = pgTable('shoes', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  brand: text('brand').notNull(),
  description: text('description'),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
  size: text('size').notNull(),
  color: text('color').notNull(),
  category: text('category').notNull(), // e.g., 'sneakers', 'boots', 'formal'
  inStock: boolean('in_stock').default(true).notNull(),
  imageUrl: text('image_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});