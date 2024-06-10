<template>
  <div
    id="skills"
    class="container space-y-6 px-8 py-16 dark:bg-transparent md:px-12 lg:py-16 max-w-6xl mx-auto rounded-xl md:rounded-3xl"
  >
    <div class="md:mb-12">
      <h2
        class="font-semibold text-3xl leading-[1.1] sm:text-3xl md:text-6xl text-center"
      >
        Skills
      </h2>
    </div>
    <div
      class="space-y-16 transition-opacity duration-1000"
      :class="[loaded ? 'opacity-100' : 'opacity-0']"
    >
      <!-- Render categories and their skills -->
      <ul
        v-for="category in categoriesWithSkills"
        :key="category._id"
        class="space-y-4"
      >
        <li>
          <h2 class="text-2xl font-semibold mb-4">
            {{ category.name }}
          </h2>
          <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <li
              v-for="skill in category.skills"
              :key="skill._id"
              class="border border-gray-300 px-3 py-3 rounded-lg flex items-center space-x-4 bg-white/50 backdrop-blur-2xl"
            >
              <div
                class="h-12 w-12 flex items-center justify-center rounded-lg p-2"
                :style="{
                  backgroundColor: skill.primaryColor?.hex || '#fff',
                  opacity: skill.opacity ?? 1,
                }"
              >
                <img
                  v-if="skill.logo"
                  :src="skill.logo ?? ''"
                  :alt="skill.name"
                  class="h-full w-full object-contain object-center"
                />
              </div>
              <div>
                <h3 class="text-lg font-semibold">{{ skill.name }}</h3>
                <p class="text-gray-400">
                  {{ skill.yearsOfExperience }} years of experience
                </p>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { processImageAndExtractColor } from '~/utils'
import type { SkillCategory, Skill } from '../types/sanity.types'

type UpdatedSkill = Omit<Skill, 'logo'> & { logo: string }

type SkillCategoryWithSkills = SkillCategory & {
  skills: UpdatedSkill[]
}

const props = defineProps({
  skills: {
    type: Array as PropType<UpdatedSkill[]>,
    required: true,
  },
  categories: {
    type: Array as PropType<SkillCategory[]>,
    required: true,
  },
})

const categoriesWithSkills = ref<SkillCategoryWithSkills[]>([])
const loaded = ref(false)

const processSkills = async () => {
  const transformedSkills = await Promise.all(
    props.skills.map(async (skill) => {
      const transformedSkill = { ...skill }
      if (transformedSkill.logo) {
        transformedSkill.primaryColor = {
          _type: 'color',
          hex:
            transformedSkill?.primaryColor?.hex ??
            (await processImageAndExtractColor(
              transformedSkill.logo ?? '',
              !!transformedSkill.fullColorBg,
              transformedSkill.primaryColor?.hex,
            )),
        }
        transformedSkill.opacity = transformedSkill?.opacity ?? 1
      } else {
        transformedSkill.primaryColor = {
          _type: 'color',
          hex: transformedSkill?.primaryColor?.hex ?? '#ffffff',
        }
        transformedSkill.opacity = transformedSkill?.opacity ?? 1
      }
      return transformedSkill
    }),
  )

  console.log(transformedSkills)

  categoriesWithSkills.value = props.categories.map((category) => {
    const transformedCategory = { ...category, skills: [] as UpdatedSkill[] }
    transformedCategory.skills = transformedSkills
      .filter((skill) => skill.category?._ref === transformedCategory._id)
      .sort((a, b) => {
        if (a.rating !== b.rating) {
          return (b?.rating ?? 0) - (a?.rating ?? 0) // Sort by rating in descending order
        } else {
          return (b.yearsOfExperience ?? 0) - (a.yearsOfExperience ?? 0) // Sort by yearsOfExperience in descending order
        }
      })
    return transformedCategory
  })

  loaded.value = true
}

onMounted(() => {
  processSkills()
})

watch(
  () => props.skills,
  (newVal) => {
    if (newVal.length) {
      processSkills()
    }
  },
)
</script>
