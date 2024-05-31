<script setup lang="ts">
import { type Post } from '~/types/Post'
import { PortableText } from '@portabletext/vue'

const route = useRoute()

const query = groq`*[ _type == "post" && slug.current == $slug][0]`
const { data: post } = await useSanityQuery<Post>(query, {
  slug: route.params.slug,
})
</script>

<template>
  <article v-if="post" class="post container relative max-w-4xl py-6 lg:py-10">
    <Button
      to="/blog"
      variant="link"
      class="xl:absolute left-[-200px] top-14 xl:inline-flex -ml-6"
    >
      <!-- <icon-chevron-left class="mr-2 h-4 w-4" /> -->
      See all posts
    </Button>

    <div>
      <time
        v-if="post._createdAt"
        :datetime="post._createdAt"
        class="block text-sm text-gray-600 mb-2"
      >
        Published on
        {{
          formatDate(post._createdAt, {
            month: 'long',
            day: '2-digit',
            year: 'numeric',
          })
        }}
      </time>
      <h1 class="mt-2 text-4xl lg:text-5xl font-extrabold mb-6">
        {{ post.title }}
      </h1>
      <img
        v-if="post.mainImage"
        class="w-full h-[200px] md:h-[500px] object-cover rounded-lg mb-6"
        :src="$urlFor(post.mainImage).width(1920).url()"
        :alt="post.title"
      />
      <div v-else class="w-full h-[200px] md:h-[500px] bg-black mb-6" />
      <div>
        <!-- <div v-if="authors.length" class="mt-4 flex space-x-4">
        <nuxt-link
          v-for="author in authors"
          :key="author._id"
          :to="`/author/${author._id}`"
          class="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-800"
        >
          <img
            v-if="author.avatar"
            :src="urlFor(author.avatar).url()"
            :alt="author.name"
            width="42"
            height="42"
            class="rounded-full"
          />
          <div class="leading-tight">
            <p class="font-medium">{{ author.name }}</p>
          </div>
        </nuxt-link>
      </div> -->
        <!-- <p class="post__excerpt">{{ post.excerpt }}</p> -->
        <div v-if="post.body" class="prose max-w-none mt-6 post__content">
          <PortableText :value="post.body" />
        </div>
        <hr class="mt-12" />
        <div class="flex justify-center py-6 lg:py-10">
          <Button to="/blog" variant="ghost" class="">
            <!-- <icon-chevron-left class="mr-2 h-4 w-4" /> -->
            See all posts
          </Button>
        </div>
      </div>
    </div>
  </article>
</template>

<style>
.prose a {
  color: #3b82f6; /* Tailwind blue-500 color */
  text-decoration: underline; /* Ensure links are clearly distinguishable */
}
</style>
