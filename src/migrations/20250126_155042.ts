import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX IF EXISTS "media_filename_idx";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "url";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "thumbnail_u_r_l";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "filename";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "mime_type";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "filesize";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "width";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "height";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "focal_x";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "focal_y";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "media" ADD COLUMN "url" varchar;
  ALTER TABLE "media" ADD COLUMN "thumbnail_u_r_l" varchar;
  ALTER TABLE "media" ADD COLUMN "filename" varchar;
  ALTER TABLE "media" ADD COLUMN "mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN "filesize" numeric;
  ALTER TABLE "media" ADD COLUMN "width" numeric;
  ALTER TABLE "media" ADD COLUMN "height" numeric;
  ALTER TABLE "media" ADD COLUMN "focal_x" numeric;
  ALTER TABLE "media" ADD COLUMN "focal_y" numeric;
  CREATE UNIQUE INDEX IF NOT EXISTS "media_filename_idx" ON "media" USING btree ("filename");`)
}
