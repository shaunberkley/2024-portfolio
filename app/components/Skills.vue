<template>
  <div
    id="skills"
    class="container space-y-6 px-8 py-16 dark:bg-transparent md:px-12 lg:py-16 max-w-5xl mx-auto rounded-xl md:rounded-3xl"
  >
    <div class="md:mb-12">
      <h2
        class="font-semibold text-3xl leading-[1.1] sm:text-3xl md:text-6xl text-center"
      >
        Skills
      </h2>
    </div>
    <div class="grid grid-cols-1 gap-16">
      <!-- Render categories and their skills -->
      <div v-for="category in categories" :key="category._id">
        <h2 class="text-2xl font-semibold mb-4">
          {{ category.name }}
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div
            v-for="skill in category.skills"
            :key="skill._id"
            class="border border-gray-300 px-3 py-3 rounded-lg flex items-center space-x-4 bg-white/50 backdrop-blur-2xl"
          >
            <div
              class="h-12 w-12 flex items-center justify-center rounded-lg p-2"
              :style="{
                backgroundColor: skill.logoBackgroundColor,
                opacity: skill.opacity ?? 1,
              }"
            >
              <img
                v-if="skill.logo"
                :src="urlFor(skill.logo).url() ?? ''"
                alt=""
                class="h-full w-full object-contain object-center"
              />
            </div>
            <div>
              <h3 class="text-lg font-semibold">{{ skill.name }}</h3>
              <p class="text-gray-400">{{ skill.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { urlFor, processImageAndExtractColor } from '~/utils'

// Fetch skills from Sanity
const skillsQuery = `*[_type == "skill"]`
const categoriesQuery = `*[_type == "skillCategory"] | order(orderRank)`

const categories = ref([])

onMounted(async () => {
  const sanity = useSanity()
  const skills = await sanity.fetch(skillsQuery)
  const fetchedCategories = await sanity.fetch(categoriesQuery)

  for (const skill of skills) {
    if (skill.logo) {
      const logoUrl = urlFor(skill.logo).url() ?? ''
      skill.logoBackgroundColor =
        skill?.primaryColor?.hex ??
        (await processImageAndExtractColor(
          logoUrl,
          skill.fullColorBg,
          skill.whiteBg,
        ))
      skill.opacity = skill?.opacity ?? 1
    } else {
      skill.logoBackgroundColor = skill?.primaryColor?.hex ?? '#ffffff'
      skill.opacity = skill?.opacity ?? 1
    }
  }

  categories.value = fetchedCategories.map((category) => {
    category.skills = skills
      .filter((skill) => skill.category._ref === category._id)
      .sort((a, b) => {
        if (a.rating !== b.rating) {
          return b.rating - a.rating // Sort by rating in descending order
        } else {
          return b.yearsOfExperience - a.yearsOfExperience // Sort by yearsOfExperience in descending order
        }
      })
    return category
  })
})
</script>
