import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import * as dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

// Check if DATABASE_URL is available
if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is missing from your .env.local file');
  process.exit(1);
}

// Log the database URL (with password masked for security)
const dbUrlForLogging = process.env.DATABASE_URL.replace(
  /(postgresql:\/\/[^:]+:)([^@]+)(@.+)/,
  '$1*****$3'
);
console.log(`Connecting to database: ${dbUrlForLogging}`);

async function main() {
  try {
    // Create a postgres connection
    const connectionString = process.env.DATABASE_URL;
    const sql = postgres(connectionString, { max: 1 });
    
    // Create a drizzle instance
    const db = drizzle(sql);
    
    // Run migrations
    console.log('Running migrations...');
    await migrate(db, { migrationsFolder: 'drizzle' });
    
    console.log('Migrations completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error running migrations:', error);
    process.exit(1);
  }
}

main();