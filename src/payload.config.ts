// storage-adapter-import-placeholder
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { DefaultLogger, ConsoleLogWriter } from '@payloadcms/db-vercel-postgres/drizzle'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { searchPlugin } from '@payloadcms/plugin-search'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Prescription } from './collections/Prescription'
import { Tmc } from './collections/Tmc'
import { searchFields } from './app/search/fieldOverrides'
import { beforeSyncWithSearch } from './app/search/beforeSync'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Prescription, Tmc],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: vercelPostgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL || '',
    },
    logger: new DefaultLogger({
      writer: new ConsoleLogWriter(),
    }),
    // idType: 'uuid',
  }),
  sharp,
  debug: true,
  plugins: [
    payloadCloudPlugin(),
    searchPlugin({
      collections: ['tmc', 'prescription'],
      defaultPriorities: {
        tmc: 10,
        prescription: 20,
      },
      beforeSync: beforeSyncWithSearch,
      searchOverrides: {
        fields: ({ defaultFields }) => {
          return [...defaultFields, ...searchFields]
        },
      },
    }),
    // storage-adapter-placeholder
  ],
})
