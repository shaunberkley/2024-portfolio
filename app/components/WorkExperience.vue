<template>
  <div
    id="experience"
    class="space-y-6 bg-slate-800/95 backdrop-blur-md py-12 px-6 md:px-0 dark:bg-transparent lg:py-16"
  >
    <div class="max-w-4xl mx-auto">
      <div class="mb-8 md:mb-12">
        <h2
          class="font-semibold text-3xl leading-[1.1] sm:text-3xl md:text-5xl text-white text-center"
        >
          Experience
        </h2>
      </div>

      <div class="flex flex-col gap-0">
        <div v-for="job in jobs" :key="job._id">
          <JobListItem :job="job" @click="handleJobClick(job)" />
        </div>
      </div>
    </div>

    <!-- Dialog for desktop -->
    <Dialog v-if="isDesktop" v-model:open="dialogOpen">
      <DialogContent class="sm:max-w-3xl">
        <DialogHeader class="flex flex-row items-center gap-4">
          <img
            :src="selectedJob?.logo"
            class="w-20 h-20 rounded-2xl p-3 border object-contain object-center"
          />
          <div>
            <DialogTitle class="text-3xl">{{
              selectedJob?.company
            }}</DialogTitle>
            <DialogDescription>
              {{ selectedJob?.role }}
            </DialogDescription>
          </div>
        </DialogHeader>
        <JobContent v-if="selectedJob" :job="selectedJob" />
      </DialogContent>
    </Dialog>

    <!-- Drawer for mobile -->
    <Drawer v-else v-model:open="drawerOpen">
      <DrawerContent class="px-2">
        <DrawerHeader class="flex flex-row items-center gap-4 text-left">
          <img
            :src="selectedJob?.logo"
            class="w-20 h-20 rounded-2xl p-3 border object-contain object-center"
          />
          <div>
            <DrawerTitle class="text-3xl">{{
              selectedJob?.company
            }}</DrawerTitle>
            <DrawerDescription>
              {{ selectedJob?.role }}
            </DrawerDescription>
          </div>
        </DrawerHeader>
        <JobContent v-if="selectedJob" :job="selectedJob" />
      </DrawerContent>
    </Drawer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useMediaQuery } from '@vueuse/core'
import JobContent from '@/components/JobContent.vue'
import JobListItem from '@/components/JobListItem.vue'
import type { Job } from '../types/sanity.types'
import type { UpdatedSkill } from './Skills.vue'

export type UpdatedJob = Omit<
  Job,
  'logo' | 'whiteLogoUrl' | 'relatedSkills'
> & {
  logo: string
  whiteLogo: string
  relatedSkills: UpdatedSkill[]
}

const jobs = ref<UpdatedJob[]>([])
const selectedJob = ref<UpdatedJob | null>(null)
const dialogOpen = ref(false)
const drawerOpen = ref(false)

const query = `*[_type == "job"]|order(endDate desc){
  _id,
  company,
  website,
  primaryColor,
  secondaryColor,
  role,
  startDate,
  endDate,
  body,
  "logo": logo.asset->url,
  "whiteLogo": whiteLogo.asset->url,
  "relatedSkills": *[_type == "skill" && references(^._id)]|order(rating desc, yearsOfExperience desc){
    _id,
    name,
    yearsOfExperience,
    rating,
    "logo": logo.asset->url,
    "whiteLogo": whiteLogo.asset->url
  }
}`

const sanityClient = useSanity()

onMounted(async () => {
  jobs.value = await sanityClient.fetch(query)
})

const isDesktop = useMediaQuery('(min-width: 768px)')

const handleJobClick = (job: UpdatedJob) => {
  selectedJob.value = job
  if (isDesktop.value) {
    dialogOpen.value = true
  } else {
    drawerOpen.value = true
  }
}
</script>
