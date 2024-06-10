import imageUrlBuilder from '@sanity/image-url'
import type { Image } from '@sanity/types'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  const sanity = useSanity() // Ensure this is correctly imported and used
  const builder = imageUrlBuilder(sanity.client)

  function urlFor(source: Image) {
    return builder.image(source)
  }

  nuxtApp.provide('urlFor', urlFor)
})
