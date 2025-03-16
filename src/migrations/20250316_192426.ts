import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_search_source" AS ENUM('1', '2');
  ALTER TABLE "search" ADD COLUMN "source" "enum_search_source";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "search" DROP COLUMN IF EXISTS "source";
  DROP TYPE "public"."enum_search_source";`)
}
