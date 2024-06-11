<script setup lang="ts">
import { defineProps, withDefaults, computed } from 'vue'
import type { HTMLAttributes } from 'vue'
import { Primitive, type PrimitiveProps } from 'radix-vue'
import { type ButtonVariants, buttonVariants } from '.'
import { cn } from '@/lib/utils'
import { NuxtLink } from '#components'

interface Props extends PrimitiveProps {
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  class?: HTMLAttributes['class']
  to?: string
  target?: string
  href?: string
}

const props = withDefaults(defineProps<Props>(), {
  as: 'button', // Default to 'button'
})

// Computed property to set 'as' dynamically
const computedAs = computed(() => {
  return props.href ? 'a' : 'button'
})
</script>

<template>
  <component
    :is="to ? NuxtLink : Primitive"
    :to="to"
    :href="href"
    :target="href ? target : null"
    :as="computedAs"
    :class="cn(buttonVariants({ variant, size }), props.class)"
  >
    <slot />
  </component>
</template>
