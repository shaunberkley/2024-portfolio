import {Rule} from '@sanity/types'

// schemas/job.js
export default {
  name: 'skill',
  type: 'document',
  title: 'Skill',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
    },
    {
      name: 'yearsOfExperience',
      type: 'number',
      title: 'Years of Experience',
    },
    {
      name: 'rating',
      type: 'number',
      title: 'Rating',
    },
    {
      name: 'logo',
      type: 'image',
      title: 'Logo',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'whiteLogo',
      type: 'image',
      title: 'White Logo',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'opacity',
      type: 'number',
      title: 'Opacity',
    },
    {
      name: 'fullColorBg',
      title: 'Full Color Background',
      type: 'boolean',
    },
    {
      name: 'whiteBg',
      title: 'White Background',
      type: 'boolean',
    },
    {
      name: 'primaryColor',
      type: 'color',
      title: 'Primary Color',
      options: {
        disableAlpha: true,
      },
    },
    {
      name: 'secondaryColor',
      type: 'color',
      title: 'Secondary Color',
      options: {
        disableAlpha: true,
      },
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    },
    {
      name: 'relatedJobs',
      title: 'Related Jobs',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: {type: 'job'},
        },
      ],
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'skillCategory'}],
      validation: (rule: Rule) => rule.required(),
    },
  ],
}
