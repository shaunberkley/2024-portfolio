import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {presentationTool} from 'sanity/presentation'
import {visionTool} from '@sanity/vision'

import {schemaTypes} from './schemas'
import {colorInput} from '@sanity/color-input'
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID!
const dataset = process.env.SANITY_STUDIO_DATASET!

export default defineConfig({
  name: 'shaunberkley',
  title: 'Shaun Berkley',
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S, context) => {
        const orderableTypes = ['skillCategory'] // Add your orderable types here
        const documentTypeItems = schemaTypes
          .filter((schema) => schema.type === 'document' && !orderableTypes.includes(schema.name))
          .map((schema) => S.documentTypeListItem(schema.name).title(schema.title ?? ''))

        return S.list()
          .title('Content')
          .items([
            // Orderable document lists
            ...orderableTypes.map((type) => orderableDocumentListDeskItem({type, S, context})),

            // Automatically include all other document types
            ...documentTypeItems,
          ])
      },
    }),
    presentationTool({
      previewUrl: {
        origin: process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000',
        previewMode: {
          enable: '/preview/enable',
          disable: '/preview/disable',
        },
      },
    }),
    visionTool(),
    colorInput(),
  ],
  schema: {
    types: schemaTypes,
  },
})
