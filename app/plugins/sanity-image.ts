import imageUrlBuilder from '@sanity/image-url'
import type { Image } from '@sanity/types'

export default defineNuxtPlugin(() => {
  const builder = imageUrlBuilder({
    projectId: process.env.NUXT_SANITY_PROJECT_ID ?? '',
    dataset: 'production',
  })

  function urlFor(source: Image) {
    return builder.image(source)
  }

  return {
    provide: { urlFor },
  }
})
