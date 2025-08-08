ALTER TABLE "orders" ALTER COLUMN "status" SET DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "stripe_payment_intent_id" varchar(255);