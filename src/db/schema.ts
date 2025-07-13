import {
    integer,
    numeric,
    pgTable,
    text,
    timestamp,
    uuid,
    varchar,
} from 'drizzle-orm/pg-core';

// Users Table Schema
export const users = pgTable('users', {
    id: uuid('id').primaryKey().references(() => authUsers.id, { onDelete: 'cascade' }),
    fullName: text('full_name'),
    avatarUrl: text('avatar_url'),
    phoneNumber: varchar('phone_number', { length: 20 }),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

// Drizzle needs a schema for the built-in auth.users table to establish references
export const authUsers = pgTable('users', {
    id: uuid('id').primaryKey(),
}, (table) => {
    return {
        tableName: 'auth.users', // Explicitly point to the 'auth' schema
    }
});

// Restaurants Table Schema
export const restaurants = pgTable('restaurants', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', { length: 255 }).notNull(),
    coverImageUrl: text('cover_image_url'),
    rating: numeric('rating', { precision: 3, scale: 2 }).default('0.00'),
    deliveryTimeMinutes: integer('delivery_time_minutes'),
    deliveryFeeCents: integer('delivery_fee_cents').default(0),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

// Menu Items Table Schema
export const menuItems = pgTable('menu_items', {
    id: uuid('id').primaryKey().defaultRandom(),
    restaurantId: uuid('restaurant_id').notNull().references(() => restaurants.id, { onDelete: 'cascade' }),
    name: varchar('name', { length: 255 }).notNull(),
    description: text('description'),
    priceCents: integer('price_cents').notNull(),
    imageUrl: text('image_url'),
    category: varchar('category', { length: 100 }),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

// Orders Table Schema
export const orders = pgTable('orders', {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'set null' }),
    restaurantId: uuid('restaurant_id').notNull().references(() => restaurants.id, { onDelete: 'set null' }),
    totalCents: integer('total_cents').notNull(),
    status: varchar('status', { length: 50 }).notNull().default('confirmed'),
    deliveryAddress: text('delivery_address'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

// Order Items Table Schema
export const orderItems = pgTable('order_items', {
    id: uuid('id').primaryKey().defaultRandom(),
    orderId: uuid('order_id').notNull().references(() => orders.id, { onDelete: 'cascade' }),
    menuItemId: uuid('menu_item_id').notNull().references(() => menuItems.id, { onDelete: 'set null' }),
    quantity: integer('quantity').notNull(),
    unitPriceCents: integer('unit_price_cents').notNull(),
});