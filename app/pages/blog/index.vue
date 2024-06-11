<script setup lang="ts">
import { formatDate, urlFor } from '~/utils'
import { type Post } from '~/types/Post'

// Define the query to fetch posts from Sanity
const query = groq`*[ _type == "post" && defined(slug.current) ] | order(_createdAt desc)`

const { data: posts } = await useSanityQuery<Post[]>(query)
</script>

<template>
  <div class="max-w-4xl px-4 lg:px-0 py-6 lg:py-10 mx-auto">
    <div
      class="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8"
    >
      <div class="flex-1 space-y-4">
        <h1 class="inline-block !font-bold text-4xl tracking-tight lg:text-5xl">
          Blog
        </h1>
        <p class="text-xl text-muted-foreground">
          A blog built using Sanity. Posts are written in MDX.
        </p>
      </div>
    </div>
    <hr class="my-8" />
    <div v-if="posts && posts.length" class="grid gap-10 sm:grid-cols-2">
      <article
        v-for="(post, index) in posts"
        :key="post._id"
        class="group relative flex flex-col space-y-2"
      >
        <template v-if="post.mainImage">
          <img
            :src="urlFor(post.mainImage).width(500).height(300).url()"
            :alt="post.title"
            width="804"
            height="452"
            class="rounded-xl border bg-muted transition-colors"
            :priority="index <= 1"
          />
        </template>
        <div class="px-0">
          <h2 class="text-2xl font-extrabold">{{ post.title }}</h2>
          <p v-if="post.excerpt" class="text-muted-foreground">
            {{ post.excerpt }}
          </p>
          <p
            v-if="post._createdAt"
            class="text-sm text-muted-foreground font-bold mt-2"
          >
            {{ formatDate(post._createdAt, 'MMM yyyy') }}
          </p>
          <NuxtLink
            :to="`/blog/${post.slug.current}`"
            class="absolute inset-0 outline-none focus-visible:ring-2 ring-blue-600 rounded-xl ring-offset-4"
          >
            <span class="sr-only">View Article: {{ post.title }}</span>
          </NuxtLink>
        </div>
      </article>
    </div>
    <p v-else>No posts published.</p>
  </div>
</template>
