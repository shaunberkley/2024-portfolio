<template>
  <main class="relative overflow-hidden min-h-[calc(100svh-64px)]">
    <div
      class="w-full absolute top-0 bottom-0 left-0 overflow-hidden opacity-40 pointer-events-none"
    >
      <div
        class="-z-10 absolute max-w-7xl w-full h-screen left-0 right-0 mx-auto"
      >
        <div
          class="absolute top-[-1000px] left-[-1000px] w-[1974px] h-[1974px] opacity-50 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(90,167,184,0.80)_0%,rgba(90,167,184,0.00)_100%)]"
        ></div>
        <div
          class="absolute right-[-1000px] top-[-200px] w-[1974px] h-[2322px] rounded-[2322px] opacity-50 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(109,155,243,0.80)_0%,rgba(108,154,243,0.00)_100%)]"
        ></div>
        <div
          class="absolute top-[1000px] left-[-1240px] w-[2480px] h-[1974px] opacity-50 rounded-[2480px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(231,129,164,0.80)_0%,rgba(231,129,164,0.00)_100%)]"
        ></div>
        <div
          class="absolute top-[1800px] right-[-700px] w-[1974px] h-[2322px] opacity-50 rounded-[2322px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(109,155,243,0.80)_0%,rgba(108,154,243,0.00)_100%)]"
        ></div>
        <div
          class="absolute top-[3300px] left-[-1000px] w-[2520px] h-[2520px] opacity-50 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(90,167,184,0.80)_0%,rgba(90,167,184,0.00)_100%)]"
        ></div>
        <div
          class="absolute top-[5700px] left-[-1000px] w-[1974px] h-[2068px] opacity-50 rounded-[2068px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(109,155,243,0.80)_0%,rgba(108,154,243,0.00)_100%)]"
        ></div>
        <div
          class="absolute top-[5700px] right-[-1000px] w-[1614px] h-[1974px] opacity-50 rounded-[1974px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(231,129,164,0.80)_0%,rgba(231,129,164,0.00)_100%)]"
        ></div>
      </div>
    </div>
    <div
      class="container space-y-6 px-8 py-8 dark:bg-transparent md:px-12 lg:py-16 max-w-6xl mx-auto rounded-xl md:rounded-3xl"
    >
      <div class="space-y-4 mb-8 md:mb-16 text-center">
        <Button
          class="rounded-full px-4 py-1.5 text-xs md:text-sm font-normal bg-white"
          variant="outline"
          to="/"
        >
          <div>
            <div class="flex items-center gap-2.5">
              <img
                src="../assets/icons/arrow-right.svg"
                class="h-4 w-auto rotate-180"
                alt=""
              />
              GO BACK
            </div>
          </div>
        </Button>
        <h1
          class="font-semibold text-4xl leading-[1.1] md:text-6xl text-center"
        >
          Skills & Expertise
        </h1>
        <h2 class="font-normal text-lg text-center">
          Explore my range of professional skills and expertise
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
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { processImageAndExtractColor } from '~/utils'
import type { SkillCategory, Skill } from '../types/sanity.types'

type UpdatedSkill = Omit<Skill, 'logo'> & { logo: string }

type SkillCategoryWithSkills = SkillCategory & {
  skills: UpdatedSkill[]
}

const skills = ref<UpdatedSkill[]>([])
const categories = ref<SkillCategory[]>([])

const categoriesWithSkills = ref<SkillCategoryWithSkills[]>([])
const loaded = ref(false)

const processSkills = async () => {
  const transformedSkills = await Promise.all(
    skills.value.map(async (skill) => {
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

  categoriesWithSkills.value = categories.value.map((category) => {
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

const fetchSkills = async () => {
  const categoriesQuery = `*[_type == "skillCategory"] | order(orderRank)`
  const skillsQuery = `*[_type == "skill"]{
    _id,
    featured,
    name,
    rating,
    yearsOfExperience,
    opacity,
    primaryColor,    
    category,
    fullColorBg,
    "logo": logo.asset->url,    
  }`
  categories.value = await useSanity().fetch(categoriesQuery)
  skills.value = await useSanity().fetch(skillsQuery)
  processSkills()
}

onBeforeMount(async () => {
  fetchSkills()
})

watch(
  () => skills.value,
  (newVal) => {
    if (newVal.length) {
      processSkills()
    }
  },
)
</script>
