import type { CollectionConfig } from 'payload'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Inquiry: CollectionConfig = {
  slug: 'inquiry',
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
          label: 'Inquiry Data',
          description: '',
          fields: [
            {
              name: 'fullName',
              label: 'Full name',
              type: 'text',
              required: true,
            },
            {
              name: 'emailAddress',
              label: 'Email Address',
              type: 'text',
              required: true,
            },
            {
              name: 'Message',
              type: 'textarea',
              required: true,
            },
          ],
        },
        {
          label: 'SEO',
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
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
          ],
        },
      ],
    },
  ],
}
