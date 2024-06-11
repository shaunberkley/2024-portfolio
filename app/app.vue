<template>
  <div class="min-h-full">
    <header class="bg-white shadow-sm sticky top-0 z-40">
      <div class="mx-auto max-w-7xl pl-2 sm:px-4 lg:px-8">
        <div class="flex h-16 justify-between">
          <div
            class="flex items-center justify-between w-full gap-8 px-2 lg:px-0"
          >
            <div class="flex flex-shrink-0 items-center">
              <NuxtLink
                to="/"
                class="flex items-center gap-2 grayscale brightness-0 hover:brightness-100 hover:grayscale-0 focus-visible:brightness-100 focus-visible:grayscale-0 transition-all ease-in-out"
              >
                <img
                  class="h-8 w-auto"
                  src="./assets/logo.svg"
                  alt="Shaun Berkley"
                />
                <span class="font-bold sm:inline-block">Shaun Berkley</span>
              </NuxtLink>
            </div>
            <NavigationMenu>
              <NavigationMenuList class="flex text-gray-500">
                <NavigationMenuItem>
                  <NuxtLink
                    v-for="item in navigation.filter((e) => !e.mobileOnly)"
                    :key="item.name"
                    :to="item.href"
                    :target="item?.target"
                    :class="navigationMenuTriggerStyle()"
                    >{{ item.name }}</NuxtLink
                  >
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      </div>
    </header>
    <main>
      <NuxtPage />
      <SpeedInsights />
    </main>
  </div>
</template>

<script setup lang="ts">
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'
import { SpeedInsights } from '@vercel/speed-insights/nuxt'
const route = useRoute()

const routeName = route.name

const open = ref<boolean>(false)

const resumeUrl = process.env.NUXT_RESUME_URL

onMounted(async () => {
  console.log(routeName)
})

const navigation = [
  { name: 'Home', href: '/', mobileOnly: true },
  { name: 'Blog', href: '/blog' },
  {
    name: 'Resume',
    href: resumeUrl,
    target: '_blank',
  },
]
</script>
