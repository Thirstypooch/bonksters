import {
    integer,
    numeric,
    pgTable,
    text,
    timestamp,
    uuid,
    varchar,
    boolean as pgBoolean
} from 'drizzle-orm/pg-core';
import {relations} from "drizzle-orm";

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
}, () => {
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

export const addresses = pgTable('addresses', {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    label: varchar('label', { length: 100 }), // e.g., 'Home', 'Work'
    fullAddress: text('full_address').notNull(), // Combined address field
    isDefault: pgBoolean('is_default').default(false).notNull(), // <-- Corrected usage
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

// Orders Table Schema
export const orders = pgTable('orders', {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'set null' }),
    restaurantId: uuid('restaurant_id').notNull().references(() => restaurants.id, { onDelete: 'set null' }),
    totalCents: integer('total_cents').notNull(),
    status: varchar('status', { length: 50 }).notNull().default('pending'),
    stripePaymentIntentId: varchar('stripe_payment_intent_id', { length: 255 }),
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

// --- RELATIONS ---

export const usersRelations = relations(users, ({ one, many }) => ({
    // A user can have many orders and many addresses
    orders: many(orders),
    addresses: many(addresses),
    // This defines the one-to-one with the auth.users table
    authUser: one(authUsers, {
        fields: [users.id],
        references: [authUsers.id]
    })
}));

export const restaurantsRelations = relations(restaurants, ({ many }) => ({
    // A restaurant can have many menu items and many orders
    menuItems: many(menuItems),
    orders: many(orders),
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
    // An order belongs to one user and one restaurant
    user: one(users, {
        fields: [orders.userId],
        references: [users.id],
    }),
    restaurant: one(restaurants, {
        fields: [orders.restaurantId],
        references: [restaurants.id],
    }),
    // An order can have many order items
    orderItems: many(orderItems),
}));

export const menuItemsRelations = relations(menuItems, ({ one, many }) => ({
    // A menu item belongs to one restaurant
    restaurant: one(restaurants, {
        fields: [menuItems.restaurantId],
        references: [restaurants.id],
    }),
    // A menu item can be in many order items
    orderItems: many(orderItems),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
    // An order item belongs to one order and one menu item
    order: one(orders, {
        fields: [orderItems.orderId],
        references: [orders.id],
    }),
    menuItem: one(menuItems, {
        fields: [orderItems.menuItemId],
        references: [menuItems.id],
    }),
}));