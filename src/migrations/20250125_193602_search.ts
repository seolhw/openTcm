import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "search" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"priority" numeric,
  	"name" varchar,
  	"composition" varchar,
  	"main_indication" varchar,
  	"effect" varchar,
  	"taste" varchar,
  	"meridian" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "search_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tmc_id" integer,
  	"prescription_id" integer
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "search_id" integer;
  DO $$ BEGIN
   ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."search"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_tmc_fk" FOREIGN KEY ("tmc_id") REFERENCES "public"."tmc"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_prescription_fk" FOREIGN KEY ("prescription_id") REFERENCES "public"."prescription"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "search_name_idx" ON "search" USING btree ("name");
  CREATE INDEX IF NOT EXISTS "search_composition_idx" ON "search" USING btree ("composition");
  CREATE INDEX IF NOT EXISTS "search_main_indication_idx" ON "search" USING btree ("main_indication");
  CREATE INDEX IF NOT EXISTS "search_effect_idx" ON "search" USING btree ("effect");
  CREATE INDEX IF NOT EXISTS "search_taste_idx" ON "search" USING btree ("taste");
  CREATE INDEX IF NOT EXISTS "search_meridian_idx" ON "search" USING btree ("meridian");
  CREATE INDEX IF NOT EXISTS "search_updated_at_idx" ON "search" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "search_created_at_idx" ON "search" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "search_rels_order_idx" ON "search_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "search_rels_parent_idx" ON "search_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "search_rels_path_idx" ON "search_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "search_rels_tmc_id_idx" ON "search_rels" USING btree ("tmc_id");
  CREATE INDEX IF NOT EXISTS "search_rels_prescription_id_idx" ON "search_rels" USING btree ("prescription_id");
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_search_fk" FOREIGN KEY ("search_id") REFERENCES "public"."search"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_search_id_idx" ON "payload_locked_documents_rels" USING btree ("search_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "search" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "search_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "search" CASCADE;
  DROP TABLE "search_rels" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_search_fk";
  
  DROP INDEX IF EXISTS "payload_locked_documents_rels_search_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "search_id";`)
}
