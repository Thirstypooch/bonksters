import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

// Explicitly load environment variables from .env.local
dotenv.config({ path: '.env.local' });

// A check to ensure the DATABASE_URL is loaded correctly.
if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is missing from your .env.local file");
}

export default defineConfig({
    // Points to the file where your database schema is defined.
    schema: "./src/db/schema.ts",

    // Specifies the output directory for migration files.
    out: "./drizzle",

    // Specifies the database dialect. For Supabase, this is 'postgresql'.
    dialect: "postgresql",

    // Provides the connection credentials to the database.
    dbCredentials: {
        url: process.env.DATABASE_URL,
    },

    // Enables detailed logging for debugging purposes.
    verbose: true,
    strict: true,
});