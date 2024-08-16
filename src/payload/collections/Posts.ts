import type { CollectionConfig } from 'payload'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { group } from 'console'

export const Posts: CollectionConfig = {
  slug: 'post',
  labels: {
    plural: 'Post',
    singular: 'Posts',
  },
  admin: {
    group: 'Dynamic Content',
  },
  access: {
    create: ({ req: { user }, data }) => {
      return Boolean(user)
    },
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          description: '',
          fields: [
            {
              type: 'group',
              name: 'header',
              label: 'Header',
              fields: [
                {
                  type: 'text',
                  name: 'title',
                  label: 'Title',
                },
                {
                  type: 'text',
                  name: 'excerpt',
                  label: 'Excerpt',
                },
                {
                  type: 'upload',
                  name: 'headerImage',
                  label: 'Header Image',
                  relationTo: 'media',
                },
              ],
            },
            {
              type: 'group',
              name: 'body',
              label: 'Body',
              fields: [
                {
                  type: 'richText',
                  name: 'content',
                  label: 'Content',
                },
              ],
            },
          ],
        },
        {
          label: 'SEO',
          name: 'seo',
          description: '',
          fields: [
            // Used as fields
            MetaTitleField({
              // if the `generateTitle` function is configured
              hasGenerateFn: true,
            }),
            MetaDescriptionField({
              // if the `generateDescription` function is configured
              hasGenerateFn: true,
            }),
            MetaImageField({
              // the upload collection slug
              relationTo: 'media',
              // if the `generateImage` function is configured
              hasGenerateFn: false,
            }),
            OverviewField({
              // field paths to match the target field for data
              titlePath: 'seo.title',
              descriptionPath: 'seo.description',
              imagePath: 'seo.image',
            }),
          ],
        },
      ],
    },
  ],
}
