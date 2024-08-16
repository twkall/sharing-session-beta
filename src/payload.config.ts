// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { resendAdapter } from '@payloadcms/email-resend'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './payload/collections/Users'
import { Media } from './payload/collections/Media'
import { Inquiry } from './payload/collections/Inquiry'
import { Posts } from './payload/collections/Posts'
import { seoPlugin } from '@payloadcms/plugin-seo'
import {
  GenerateDescription,
  GenerateImage,
  GenerateTitle,
  GenerateURL,
} from '@payloadcms/plugin-seo/types'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const generateTitle: GenerateTitle = ({ doc }) => {
  return doc?.title ? `${doc.title} | Demo Site` : 'Demo Site'
}

const generateDescription: GenerateDescription = ({ doc }) => {
  return doc?.excerpt ? `${doc.excerpt}` : ''
}

const generateURL: GenerateURL = ({ doc }) => {
  return doc?.slug
    ? `${process.env.NEXT_PUBLIC_SERVER_URL ?? ''}/${doc.slug}`
    : process.env.NEXT_PUBLIC_SERVER_URL ?? ''
}

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [Users, Media, Inquiry, Posts],
  editor: lexicalEditor(),
  email: resendAdapter({
    defaultFromAddress: 'hello@kall.dev',
    defaultFromName: 'Iqbal Tawakal',
    apiKey: process.env.RESEND_API_KEY || '',
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    // storage-adapter-placeholder
    seoPlugin({
      generateTitle,
      generateURL,
      generateDescription,
    }),
  ],
})
