import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'

export default {
  name: 'skillCategory',
  title: 'Skill Category',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    // Add the orderRank field
    orderRankField({type: 'skillCategory'}),
  ],
  orderings: [
    {
      title: 'Manual Order',
      name: 'manualOrder',
      by: [{field: '_updatedAt', direction: 'asc'}],
    },
    // Ensure orderRankOrdering is an array of objects
    ...(Array.isArray(orderRankOrdering) ? orderRankOrdering : []),
  ],
}
