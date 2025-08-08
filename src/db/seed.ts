import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { config } from 'dotenv';

config({ path: '.env.local' });

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    throw new Error('DATABASE_URL is not set in the environment variables.');
}

const client = postgres(connectionString, { max: 1 });
const db = drizzle(client, { schema });

// --- SEED DATA ---
const RESTAURANTS_TO_SEED = [
    {
        name: 'Burger Joint',
        coverImageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=300&fit=crop',
        rating: '4.50',
        deliveryTimeMinutes: 30,
        deliveryFeeCents: 599,
        menu: [
            { name: 'Classic Burger', description: 'Beef patty with lettuce, tomato, onion, and our special sauce', priceCents: 1299, imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300', category: 'Main Course' },
            { name: 'Loaded Fries', description: 'French fries topped with cheese, bacon, and green onions', priceCents: 899, imageUrl: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?w=300', category: 'Appetizers' },
            { name: 'Chocolate Shake', description: 'Rich and creamy chocolate milkshake topped with whipped cream', priceCents: 599, imageUrl: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=300', category: 'Desserts' },
        ]
    },
    {
        name: 'Pizza Palace',
        coverImageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&h=300&fit=crop',
        rating: '4.20',
        deliveryTimeMinutes: 25,
        deliveryFeeCents: 0,
        menu: [
            { name: 'Pepperoni Pizza', description: 'Classic pepperoni pizza with mozzarella cheese.', priceCents: 1599, imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300', category: 'Main Course' },
            { name: 'Garlic Bread', description: 'Toasted bread with garlic butter and herbs.', priceCents: 699, imageUrl: 'https://images.unsplash.com/photo-1619894991209-9f9694be045a?w=300', category: 'Appetizers' },
        ]
    },
    {
        name: 'Sushi Heaven',
        coverImageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&h=300&fit=crop',
        rating: '4.80',
        deliveryTimeMinutes: 40,
        deliveryFeeCents: 399,
        menu: [
            { name: 'California Roll', description: 'Crab, avocado, and cucumber.', priceCents: 999, imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=300', category: 'Sushi' },
            { name: 'Miso Soup', description: 'Traditional Japanese soup with tofu and seaweed.', priceCents: 399, imageUrl: 'https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=300', category: 'Appetizers' },
        ]
    },
    {
        name: 'Taco Fiesta',
        coverImageUrl: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&h=300&fit=crop',
        rating: '4.00',
        deliveryTimeMinutes: 35,
        deliveryFeeCents: 299,
        menu: [
            { name: 'Carne Asada Tacos', description: 'Three grilled steak tacos with onion and cilantro.', priceCents: 1399, imageUrl: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=300', category: 'Main Course' },
            { name: 'Chips and Guacamole', description: 'Freshly made guacamole with tortilla chips.', priceCents: 799, imageUrl: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=300', category: 'Appetizers' },
        ]
    },
    {
        name: 'The Green Bowl',
        coverImageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=300&fit=crop',
        rating: '4.70',
        deliveryTimeMinutes: 20,
        deliveryFeeCents: 450,
        menu: [
            { name: 'Quinoa Power Bowl', description: 'A vibrant mix of quinoa, roasted sweet potatoes, avocado, and kale.', priceCents: 1450, imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300', category: 'Vegan' },
            { name: 'Lentil Soup', description: 'Hearty and warming lentil soup, served with a slice of sourdough.', priceCents: 750, imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=300', category: 'Appetizers' },
        ]
    },
    {
        name: 'Morning Eats',
        coverImageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=500&h=300&fit=crop',
        rating: '4.60',
        deliveryTimeMinutes: 25,
        deliveryFeeCents: 300,
        menu: [
            { name: 'Pancake Stack', description: 'Fluffy buttermilk pancakes served with maple syrup and fresh berries.', priceCents: 1199, imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=300', category: 'Breakfast' },
            { name: 'Avocado Toast', description: 'Smashed avocado on toasted sourdough, topped with chili flakes.', priceCents: 950, imageUrl: 'https://images.unsplash.com/photo-1584776296944-ab6fb57b0bdd?w=300', category: 'Breakfast' },
        ]
    },
    {
        name: 'Biryani House',
        coverImageUrl: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500&h=300&fit=crop',
        rating: '4.90',
        deliveryTimeMinutes: 45,
        deliveryFeeCents: 150,
        menu: [
            { name: 'Chicken Dum Biryani', description: 'Aromatic basmati rice cooked with chicken and exotic spices.', priceCents: 1899, imageUrl: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=300', category: 'Biryani' },
            { name: 'Vegetable Samosas', description: 'Crispy pastry filled with spiced potatoes and peas.', priceCents: 650, imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300', category: 'Appetizers' },
        ]
    }
];

// --- SEEDING LOGIC ---
const seed = async () => {
    console.log('Seeding database...');

    // Clear existing data
    await db.delete(schema.menuItems);
    await db.delete(schema.restaurants);
    console.log('Cleared existing data.');

    // Insert restaurants and their menus
    for (const restaurantData of RESTAURANTS_TO_SEED) {
        const [newRestaurant] = await db
            .insert(schema.restaurants)
            .values({
                name: restaurantData.name,
                coverImageUrl: restaurantData.coverImageUrl,
                rating: restaurantData.rating,
                deliveryTimeMinutes: restaurantData.deliveryTimeMinutes,
                deliveryFeeCents: restaurantData.deliveryFeeCents,
            })
            .returning();

        console.log(`Inserted restaurant: ${newRestaurant.name}`);

        if (restaurantData.menu.length > 0) {
            const menuItemsData = restaurantData.menu.map((item) => ({
                ...item,
                restaurantId: newRestaurant.id,
            }));

            await db.insert(schema.menuItems).values(menuItemsData);
            console.log(` -> Inserted ${menuItemsData.length} menu items.`);
        }
    }

    console.log('Database seeding complete!');
    process.exit(0);
};

seed().catch((error) => {
    console.error('Error seeding database:', error);
    process.exit(1);
});
