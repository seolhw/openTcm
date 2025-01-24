import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
        CREATE UNIQUE INDEX IF NOT EXISTS "prescription_name_composition_idx" ON "prescription" ("name", "composition");
    `)
  // Migration code
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
        DROP INDEX IF EXISTS "prescription_name_composition_idx";
    `)
  // Migration code
}
