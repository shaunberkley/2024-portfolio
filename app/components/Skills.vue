<template>
  <div
    id="skills"
    class="container space-y-6 px-6 py-12 dark:bg-transparent md:px-12 lg:py-16 max-w-6xl mx-auto rounded-xl md:rounded-3xl"
  >
    <div class="md:mb-12">
      <h2
        class="font-semibold text-3xl leading-[1.1] sm:text-3xl md:text-5xl text-center"
      >
        Some of my top skills
      </h2>
    </div>
    <div
      v-if="!loaded"
      class="space-y-16 transition-opacity duration-1000 opacity-100"
    >
      <div
        class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
      >
        <Skeleton
          v-for="index in 16"
          :key="index"
          class="h-[74px] border border-gray-300 px-3 py-3 rounded-lg flex items-center space-x-4 bg-white/50 backdrop-blur-2xl"
        />
      </div>
    </div>
    <div
      v-else
      class="space-y-16 transition-opacity duration-1000 ease-in opacity-100"
    >
      <ul class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <li
          v-for="skill in flatSkills"
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
            <h3 class="md:text-lg font-semibold">{{ skill.name }}</h3>
          </div>
        </li>
      </ul>
    </div>
    <div class="flex justify-center">
      <Button to="/skills" class="px-10 mt-6 flex items-center gap-2.5"
        >View All
        <img
          src="../assets/icons/arrow-right.svg"
          class="h-4 w-auto brightness-100 invert"
          alt=""
      /></Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { processImageAndExtractColor } from '~/utils'
import type { SkillCategory, Skill } from '../types/sanity.types'

export type UpdatedSkill = Omit<Skill, 'logo' | 'whiteLogoUrl'> & {
  logo: string
  whiteLogo: string
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

const flatSkills = ref<UpdatedSkill[]>([])
const loaded = ref(false)

const preloadImages = (skills: UpdatedSkill[]) => {
  return Promise.all(
    skills.map((skill) => {
      if (skill.logo) {
        return new Promise<void>((resolve) => {
          const img = new Image()
          img.src = skill.logo
          img.onload = () => resolve()
          img.onerror = () => resolve() // Resolve on error to avoid blocking
        })
      }
      return Promise.resolve()
    }),
  )
}

const processSkills = async () => {
  await preloadImages(props.skills)

  const transformedSkills = await Promise.all(
    props.skills
      .filter((skill) => skill.featured)
      .map(async (skill) => {
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

  flatSkills.value = props.categories.reduce((acc, category) => {
    const categorySkills = transformedSkills
      .filter((skill) => skill.category?._ref === category._id)
      .sort((a, b) => {
        if (a.rating !== b.rating) {
          return (b?.rating ?? 0) - (a?.rating ?? 0) // Sort by rating in descending order
        } else {
          return (b.yearsOfExperience ?? 0) - (a.yearsOfExperience ?? 0) // Sort by yearsOfExperience in descending order
        }
      })
    return acc.concat(categorySkills)
  }, [] as UpdatedSkill[])

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
