// schemas/job.js
export default {
  name: 'job',
  type: 'document',
  title: 'Job',
  fields: [
    {
      name: 'company',
      type: 'string',
      title: 'Company',
    },
    {
      name: 'website',
      type: 'string',
      title: 'Website',
    },
    {
      name: 'role',
      type: 'string',
      title: 'Role',
    },
    {
      name: 'startDate',
      type: 'date',
      title: 'Start Date',
    },
    {
      name: 'endDate',
      type: 'date',
      title: 'End Date',
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
  ],
}
