<template>
  <div>
    <dl
      class="divide-y divide-gray-100 max-h-96 overflow-auto md:max-h-[750px]"
    >
      <div v-if="job.website" class="px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-4">
        <dt class="text-sm font-medium text-gray-900">Website</dt>
        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-3 sm:mt-0">
          <a :href="job.website" target="_blank">{{ job.website }}</a>
        </dd>
      </div>
      <div class="px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-4">
        <dt class="text-sm font-medium text-gray-900">Start Date</dt>
        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-3 sm:mt-0">
          {{ formatDate(job.startDate ?? '', 'MMMM yyyy') }}
        </dd>
      </div>
      <div class="px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-4">
        <dt class="text-sm font-medium text-gray-900">End Date</dt>
        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-3 sm:mt-0">
          {{ job.endDate ? formatDate(job.endDate, 'MMMM yyyy') : 'Present' }}
        </dd>
      </div>
      <div v-if="job.body" class="px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-4">
        <dt class="text-sm font-medium text-gray-900">Summary</dt>
        <dd
          class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-3 sm:mt-0 job-body"
        >
          <PortableText :value="job.body" />
        </dd>
      </div>
      <div class="px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-4">
        <dt class="text-sm font-medium text-gray-900">Skills Used</dt>
        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-3 sm:mt-0">
          <ul class="flex gap-2 flex-wrap">
            <li
              class="flex items-center gap-2 border rounded-full px-2.5 py-1"
              v-for="skill in job.relatedSkills"
              :key="skill._id"
            >
              <img :src="skill.logo" class="w-5 h-5" /> {{ skill.name }}
            </li>
          </ul>
        </dd>
      </div>
    </dl>
  </div>
</template>

<script setup lang="ts">
import type { UpdatedJob } from './WorkExperience.vue'
import { PortableText } from '@portabletext/vue'

const props = defineProps<{
  job: UpdatedJob
}>()
</script>

<style>
.job-body ul {
  list-style: disc;
  padding: 0 12px;
}
</style>
