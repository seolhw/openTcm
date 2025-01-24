import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "tmc" (
      "id" serial PRIMARY KEY NOT NULL,
      "name" varchar NOT NULL,
      "taste" varchar NOT NULL,
      "meridian" varchar NOT NULL,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'payload_locked_documents_rels' 
          AND column_name = 'tmc_id'
      ) THEN
        ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "tmc_id" integer;
      END IF;
    END $$;

    CREATE INDEX IF NOT EXISTS "tmc_name_idx" ON "tmc" USING btree ("name");
    CREATE INDEX IF NOT EXISTS "tmc_updated_at_idx" ON "tmc" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "tmc_created_at_idx" ON "tmc" USING btree ("created_at");

    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1 
        FROM pg_constraint 
        WHERE conname = 'payload_locked_documents_rels_tmc_fk'
      ) THEN
        ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tmc_fk" 
        FOREIGN KEY ("tmc_id") REFERENCES "tmc"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
      END IF;
    END $$;

    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_tmc_id_idx" ON "payload_locked_documents_rels" USING btree ("tmc_id");
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "tmc" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "tmc" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_tmc_fk";
  
  DROP INDEX IF EXISTS "payload_locked_documents_rels_tmc_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "tmc_id";`)
}
