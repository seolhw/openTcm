import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_prescription_source" AS ENUM('1', '2');
  ALTER TABLE "prescription" ADD COLUMN "source" "enum_prescription_source";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "prescription" DROP COLUMN IF EXISTS "source";
  DROP TYPE "public"."enum_prescription_source";`)
}
