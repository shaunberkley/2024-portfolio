<template>
  <div class="w-full h-full relative group">
    <Button
      variant="outline"
      to="#skills"
      class="bg-white/50 backdrop-blur-lg rounded-full px-24 absolute z-40 left-0 right-0 -bottom-36 md:-bottom-44 max-w-fit mx-auto transition-opacity duration-300 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 group-focus-within:opacity-100 hover:opacity-100 focus-visible:opacity-100"
    >
      View all skills
    </Button>

    <div
      class="transition-all duration-300 absolute left-0 right-0 -bottom-[440px] z-40 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 group-focus-within:opacity-100 group-focus-visible:-bottom-[245px] group-focus-within:-bottom-[245px] md:group-focus-visible:-bottom-[270px] group-hover:-bottom-[245px] md:group-hover:-bottom-[270px] md:group-focus-within:-bottom-[270px]"
    >
      <ToggleGroup type="single" v-model="bubbleMode">
        <ToggleGroupItem
          value="chill"
          aria-label="Chill"
          class="rounded-full w-16 h-16"
          variant="outline"
        >
          <span class="text-4xl">😎</span>
        </ToggleGroupItem>
        <ToggleGroupItem
          value="mesmerize"
          aria-label="Mesmerize"
          class="rounded-full w-16 h-16"
          variant="outline"
        >
          <span class="text-4xl">🤩</span>
        </ToggleGroupItem>
        <ToggleGroupItem
          value="party"
          aria-label="Party"
          class="rounded-full w-16 h-16"
          variant="outline"
        >
          <span class="text-4xl">🤯</span>
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
    <div
      class="bubble-wrap h-[300px] overflow-visible relative transition-all hover:blur-lg focus:blur-lg group-has-[:focus]:blur-lg group-hover:blur-lg group-focus:blur-lg"
    >
      <div
        ref="bubbles"
        class="bubbles relative scale-[40%] md:scale-50 transition-opacity duration-1000"
        :class="[loaded ? 'opacity-100' : 'opacity-0']"
      >
        <div
          v-for="(bubble, index) in bubbleSpecs"
          :key="index"
          :style="bubble.style"
          class="absolute bg-white rounded-full shadow-lg h-[152px] w-[152px] p-5 bg-origin-content bg-contain bg-no-repeat bg-center hover:z-20 overflow-hidden"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue'
import { createNoise2D } from 'simplex-noise'
import alea from 'alea'
import { urlFor } from '~/utils'
import type { Skill } from '../types/sanity.types'
import type { Image as SanityImage } from '@sanity/types'

const props = defineProps({
  skills: {
    type: Array as PropType<Skill[]>,
    required: true,
  },
})

// Define the bubble spec interface
interface BubbleSpec {
  s?: number
  x: number
  y: number
  noiseSeedX: number
  noiseSeedY: number
  xWithNoise?: number
  yWithNoise?: number
  style?: Record<string, string | number>
  logoUrl?: string
  skillName?: string
  yearsOfExperience?: number
  rating?: number
  backgroundColor?: string
  in?: number
  fullColorBg?: boolean
  opacity?: number
  loaded?: boolean
}

const bubbleSpecs = ref<BubbleSpec[]>([
  { s: 0.8, x: 75, y: 103, noiseSeedX: 0, noiseSeedY: 0 },
  { s: 0.8, x: 323, y: 60, noiseSeedX: 0, noiseSeedY: 0 },
  { s: 0.6, x: 276, y: 256, noiseSeedX: 0, noiseSeedY: 0 },
  { s: 0.8, x: 129, y: 357, noiseSeedX: 0, noiseSeedY: 0 },
  { s: 0.6, x: 444, y: 193, noiseSeedX: 0, noiseSeedY: 0 },
  { x: 413, y: 367, noiseSeedX: 0, noiseSeedY: 0 },
  { x: 624, y: 111, noiseSeedX: 0, noiseSeedY: 0 },
  { s: 0.6, x: 795, y: 226, noiseSeedX: 0, noiseSeedY: 0 },
  { s: 0.8, x: 633, y: 320, noiseSeedX: 0, noiseSeedY: 0 },
  { s: 0.8, x: 907, y: 88, noiseSeedX: 0, noiseSeedY: 0 },
  { x: 901, y: 385, noiseSeedX: 0, noiseSeedY: 0 },
  { x: 1071, y: 233, noiseSeedX: 0, noiseSeedY: 0 },
  { s: 0.6, x: 1134, y: 45, noiseSeedX: 0, noiseSeedY: 0 },
  { s: 0.6, x: 1210, y: 365, noiseSeedX: 0, noiseSeedY: 0 },
  { s: 0.8, x: 1303, y: 193, noiseSeedX: 0, noiseSeedY: 0 },
  { s: 0.8, x: 1440, y: 342, noiseSeedX: 0, noiseSeedY: 0 },
  { x: 1519, y: 118, noiseSeedX: 0, noiseSeedY: 0 },
  { s: 0.6, x: 1620, y: 271, noiseSeedX: 0, noiseSeedY: 0 },
  { s: 0.6, x: 1761, y: 372, noiseSeedX: 0, noiseSeedY: 0 },
  { x: 1773, y: 148, noiseSeedX: 0, noiseSeedY: 0 },
  { s: 0.8, x: 1929, y: 293, noiseSeedX: 0, noiseSeedY: 0 },
  { x: 1990, y: 75, noiseSeedX: 0, noiseSeedY: 0 },
  { x: 2098, y: 385, noiseSeedX: 0, noiseSeedY: 0 },
  { s: 0.8, x: 2135, y: 198, noiseSeedX: 0, noiseSeedY: 0 },
  { s: 0.6, x: 2271, y: 356, noiseSeedX: 0, noiseSeedY: 0 },
  { s: 0.8, x: 2276, y: 82, noiseSeedX: 0, noiseSeedY: 0 },
  { x: 2423, y: 244, noiseSeedX: 0, noiseSeedY: 0 },
  { s: 0.6, x: 2499, y: 79, noiseSeedX: 0, noiseSeedY: 0 },
  { s: 0.6, x: 2545, y: 387, noiseSeedX: 0, noiseSeedY: 0 },
  { s: 0.8, x: 2654, y: 182, noiseSeedX: 0, noiseSeedY: 0 },
  { s: 0.6, x: 2704, y: 334, noiseSeedX: 0, noiseSeedY: 0 },
  { s: 0.8, x: 2783, y: 60, noiseSeedX: 0, noiseSeedY: 0 },
  { x: 2895, y: 271, noiseSeedX: 0, noiseSeedY: 0 },
  { s: 0.6, x: 3038, y: 372, noiseSeedX: 0, noiseSeedY: 0 },
  { s: 0.8, x: 3049, y: 148, noiseSeedX: 0, noiseSeedY: 0 },
  { s: 0.6, x: 3185, y: 293, noiseSeedX: 0, noiseSeedY: 0 },
  { x: 3246, y: 75, noiseSeedX: 0, noiseSeedY: 0 },
  { x: 3354, y: 385, noiseSeedX: 0, noiseSeedY: 0 },
  { s: 0.8, x: 3391, y: 198, noiseSeedX: 0, noiseSeedY: 0 },
  { s: 0.6, x: 3527, y: 356, noiseSeedX: 0, noiseSeedY: 0 },
  { s: 0.8, x: 3532, y: 82, noiseSeedX: 0, noiseSeedY: 0 },
  { x: 3679, y: 244, noiseSeedX: 0, noiseSeedY: 0 },
  { s: 0.6, x: 3755, y: 79, noiseSeedX: 0, noiseSeedY: 0 },
  { s: 0.6, x: 3801, y: 387, noiseSeedX: 0, noiseSeedY: 0 },
  { s: 0.8, x: 3910, y: 182, noiseSeedX: 0, noiseSeedY: 0 },
  { s: 0.6, x: 3960, y: 334, noiseSeedX: 0, noiseSeedY: 0 },
])

const noise2D = createNoise2D(alea('seed'))
type BubbleMode = 'chill' | 'mesmerize' | 'party'

const defaultBubbleXMultiplier: number = 5
const defaultBubbleYMultiplier: number = 5
const defaultBubbleSpeed: number = 4
const defaultBubbleMode: BubbleMode = 'chill'

const bubbleXMultiplier = ref<number>(defaultBubbleXMultiplier)
const bubbleYMultiplier = ref<number>(defaultBubbleYMultiplier)
const speed = ref<number>(defaultBubbleSpeed)
const bubbleMode = ref<BubbleMode>(defaultBubbleMode)

watch(
  bubbleMode,
  (newMode) => {
    const originalBubbleSpecs = JSON.parse(JSON.stringify(bubbleSpecs.value))
    if (newMode === 'chill') {
      bubbleXMultiplier.value = defaultBubbleYMultiplier
      bubbleYMultiplier.value = defaultBubbleYMultiplier
      speed.value = 1
      // Reset bubbleSpecs to original positions
      bubbleSpecs.value = bubbleSpecs.value.map((bubble, index) => ({
        ...bubble,
        x: originalBubbleSpecs[index].x,
        y: originalBubbleSpecs[index].y,
        noiseSeedX: originalBubbleSpecs[index].noiseSeedX,
        noiseSeedY: originalBubbleSpecs[index].noiseSeedY,
      }))
    } else if (newMode === 'mesmerize') {
      bubbleXMultiplier.value = 20
      bubbleYMultiplier.value = 1000
      speed.value = 2
    } else if (newMode === 'party') {
      bubbleXMultiplier.value = 1000
      bubbleYMultiplier.value = 1000
      speed.value = 4
    }
  },
  { immediate: true },
)

const loaded = ref(false)

const getBubbleStyle = (
  bubble: BubbleSpec,
  containerWidth: number,
  margin: number,
) => {
  const randomX = noise2D(bubble.noiseSeedX, 0)
  const randomY = noise2D(bubble.noiseSeedY, 0)

  bubble.noiseSeedX += 0.004
  bubble.noiseSeedY += 0.004

  bubble.x = bubble.x - speed.value
  bubble.xWithNoise = bubble.x + randomX * bubbleXMultiplier.value
  bubble.yWithNoise = bubble.y + randomY * bubbleYMultiplier.value

  if (bubble.xWithNoise < -margin) {
    bubble.x = containerWidth * 2
  }

  return {
    transform: `translate(${bubble.xWithNoise}px, ${bubble.yWithNoise}px) scale(${bubble.s ?? 1})`,
    backgroundImage: `url(${bubble.logoUrl})`,
    backgroundColor: bubble.backgroundColor ?? '',
    opacity: bubble.opacity ?? 1,
  }
}

const processSkills = async () => {
  await nextTick() // Ensure DOM is fully loaded

  const container = document.querySelector('.bubbles')
  if (!container) {
    console.error('Container not found')
    return
  }

  const containerWidth = container.clientWidth || 0
  const margin = Math.max(containerWidth * 0.6, 2900) // Use a margin to control when the bubbles re-enter

  // Filter skills to include only featured skills with logos
  const filteredSkills = props.skills.filter(
    (skill) => skill.featured && skill.logo,
  )
  const skillLength = filteredSkills.length

  if (skillLength === 0) return

  const processedBubbles = await Promise.all(
    bubbleSpecs.value.map(async (bubble, index) => {
      const skillIndex = index % skillLength
      const skill = filteredSkills[skillIndex]

      if (!skill || !skill.logo) {
        console.error('Skill or skill logo not found')
        return bubble
      }

      const logoUrl = urlFor(skill.logo as SanityImage)
        .width(200)
        .url()
      const backgroundColor = await processImageAndExtractColor(
        logoUrl,
        skill.fullColorBg,
        skill.primaryColor?.hex,
      )

      return {
        ...bubble,
        in: index,
        logoUrl,
        noiseSeedX: Math.floor(Math.random() * 64000),
        noiseSeedY: Math.floor(Math.random() * 64000),
        backgroundColor,
        fullColorBg: skill.fullColorBg,
        opacity: skill.fullColorBg ? 1 : skill.opacity ?? 1,
        primaryColor: skill.primaryColor,
        loaded: true,
        style: getBubbleStyle(
          {
            ...bubble,
            backgroundColor,
            fullColorBg: skill.fullColorBg,
            opacity: skill.fullColorBg ? 1 : 0.4,
            loaded: true,
          },
          containerWidth,
          margin,
        ),
      }
    }),
  )

  bubbleSpecs.value = processedBubbles.filter((bubble) => bubble !== undefined)
  nextTick(() => {
    loaded.value = true
  })

  const updateBubbles = () => {
    const containerWidth = container.clientWidth || 0
    bubbleSpecs.value.forEach((bubble) => {
      bubble.style = getBubbleStyle(bubble, containerWidth, margin)
    })

    requestAnimationFrame(updateBubbles)
  }

  requestAnimationFrame(updateBubbles)
}

onMounted(() => {
  nextTick(() => {
    processSkills()
  })
})

watch(
  () => props.skills,
  (newVal) => {
    if (newVal.length) {
      nextTick(() => {
        processSkills()
      })
    }
  },
)
</script>
