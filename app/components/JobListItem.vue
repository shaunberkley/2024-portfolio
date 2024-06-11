<template>
  <button
    @click="emit('click', props.job)"
    class="w-full flex items-center justify-between text-left py-6 px-4 transition-all ease-in-out outline-none bg-none rounded-[28px] duration-300 md:focus-visible:px-6 md:hover:px-6 hover:bg-slate-950/10 focus-visible:bg-slate-950/10"
  >
    <div class="flex items-center space-x-3 md:space-x-6 text-muted">
      <div
        class="scale-[80%] md:scale-100 w-20 h-20 clip-rounded-image bg-no-repeat bg-center py-5 px-3 bg-origin-content bg-contain"
        :style="getJobStyle(job.primaryColor, job.whiteLogo)"
      ></div>
      <div>
        <h2 class="text-lg md:text-xl font-semibold opacity-90">
          {{ job.company }}
        </h2>
        <p class="text-sm md:text-base text-muted opacity-65">
          {{ job.role }}
        </p>
        <p class="md:hidden text-sm md:text-base text-muted opacity-65">
          {{ formatDate(job.startDate ?? '', 'MMM yyyy') }}
          -
          {{ job.endDate ? formatDate(job.endDate, 'MMM yyyy') : 'Present' }}
        </p>
      </div>
    </div>
    <p class="hidden md:block text-muted opacity-65">
      {{ formatDate(job.startDate ?? '', 'MMM yyyy') }}
      -
      {{ job.endDate ? formatDate(job.endDate, 'MMM yyyy') : 'Present' }}
    </p>
  </button>
</template>

<script setup lang="ts">
import type { UpdatedJob } from './WorkExperience.vue'

const props = defineProps<{
  job: UpdatedJob
}>()

const emit = defineEmits(['click'])

const getJobStyle = (primaryColor: any, backgroundImage: string) => {
  return {
    backgroundColor: primaryColor.hex,
    backgroundImage: `url(${backgroundImage})`,
  }
}
</script>
