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
        <button
          v-for="job in jobs"
          :key="job._id"
          class="flex items-center justify-between text-left py-6 px-4 transition-all ease-in-out outline-none bg-none rounded-[28px] duration-300 md:focus-visible:px-6 md:hover:px-6 hover:bg-slate-950/10 focus-visible:bg-slate-950/10"
        >
          <div class="flex items-center space-x-3 md:space-x-6 text-muted">
            <div
              class="scale-[80%] md:scale-100 w-20 h-20 clip-rounded-image bg-no-repeat bg-center py-5 px-3 bg-origin-content bg-contain"
              :style="getJobStyle(job.primaryColor, job.whiteLogoUrl)"
            ></div>
            <div>
              <h2 class="text-lg md:text-xl font-semibold opacity-90">
                {{ job.company }}
              </h2>
              <p class="text-sm md:text-base text-muted opacity-65">
                {{ job.role }}
              </p>
              <p class="md:hidden text-sm md:text-base text-muted opacity-65">
                {{ formatDate(job.startDate, 'MMM yyyy') }}
                -
                {{
                  job.endDate ? formatDate(job.endDate, 'MMM yyyy') : 'Present'
                }}
              </p>
            </div>
          </div>
          <p class="hidden md:block text-muted opacity-65">
            {{ formatDate(job.startDate, 'MMM yyyy') }}
            -
            {{ job.endDate ? formatDate(job.endDate, 'MMM yyyy') : 'Present' }}
          </p>
        </button>
      </div>
    </div>
  </div>
</template>

<script async setup lang="ts">
import { ref, onMounted } from 'vue'

interface Job {
  _id: string
  company: string
  website: string
  primaryColor: string
  secondaryColor: string
  role: string
  startDate: string
  endDate?: string
  logoUrl: string
  whiteLogoUrl: string
}

const jobs = ref<Job[]>([])

const query = groq`*[_type == "job"]|order(endDate desc){
    _id,
    company,
    website,
    primaryColor,
    secondaryColor,
    role,
    startDate,
    endDate,
    "logoUrl": logo.asset->url,
    "whiteLogoUrl": whiteLogo.asset->url
  }`

const sanityClient = useSanity()

onMounted(async () => {
  jobs.value = await sanityClient.fetch(query)
})

const getJobStyle = (primaryColor: any, backgroundImage: string) => {
  const styleObject = {
    backgroundColor: primaryColor.hex,
    backgroundImage: `url(${backgroundImage})`,
  }
  return styleObject
}
</script>

<style scoped>
/* Use Tailwind classes for styling */
</style>
