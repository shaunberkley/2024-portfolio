<template>
  <div class="min-h-full">
    <header class="bg-white shadow-sm sticky top-0 z-40">
      <div class="mx-auto max-w-7xl pl-2 sm:px-4 lg:px-8">
        <Popover class="flex h-16 justify-between" v-slot="{ open }">
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
                  alt="Your Company"
                />
                <span class="hidden font-bold sm:inline-block"
                  >Shaun Berkley</span
                >
              </NuxtLink>
              <div class="flex items-center md:hidden">
                <!-- Mobile menu button -->
                <PopoverButton
                  class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                >
                  <span class="sr-only">Open main menu</span>
                  Menu
                </PopoverButton>
              </div>
            </div>
            <NavigationMenu>
              <NavigationMenuList class="flex text-gray-500">
                <NavigationMenuItem>
                  <NuxtLink
                    v-for="item in navigation.filter((e) => !e.mobileOnly)"
                    :key="item.name"
                    :to="item.href"
                    :class="navigationMenuTriggerStyle()"
                    >{{ item.name }}</NuxtLink
                  >
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div class="flex flex-1 items-center pl-2 lg:ml-6 justify-end">
            <button
              type="button"
              class="ml-auto flex-shrink-0 rounded-full bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <span class="sr-only">Search</span>
            </button>
          </div>
          <TransitionRoot as="template" :show="open">
            <div class="lg:hidden">
              <TransitionChild
                as="template"
                enter="duration-150 ease-out"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="duration-150 ease-in"
                leave-from="opacity-100"
                leave-to="opacity-0"
              >
                <PopoverOverlay
                  class="fixed inset-0 z-20 bg-black bg-opacity-25"
                  aria-hidden="true"
                />
              </TransitionChild>

              <TransitionChild
                as="template"
                enter="duration-150 ease-out"
                enter-from="opacity-0 scale-95"
                enter-to="opacity-100 scale-100"
                leave="duration-150 ease-in"
                leave-from="opacity-100 scale-100"
                leave-to="opacity-0 scale-95"
              >
                <PopoverPanel
                  focus
                  class="absolute top-0 right-0 z-30 w-full max-w-none origin-top transform p-2 transition"
                >
                  <div
                    class="divide-y divide-gray-200 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5"
                  >
                    <div class="pt-3 pb-2">
                      <div class="flex items-center justify-between px-4">
                        <div class="flex items-center gap-2">
                          <img
                            class="h-8 w-auto"
                            src="./assets/logo.svg"
                            alt="Your Company"
                          />
                          <span class="font-bold">Shaun Berkley</span>
                        </div>
                        <div class="-mr-2">
                          <PopoverButton
                            class="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                          >
                            <span class="sr-only">Close menu</span>
                            <img
                              src="./assets/icons/close.svg"
                              class="h-6 w-6"
                              aria-hidden="true"
                            />
                          </PopoverButton>
                        </div>
                      </div>
                      <div class="mt-3 space-y-1 px-2">
                        <a
                          v-for="item in navigation"
                          :key="item.name"
                          :href="item.href"
                          class="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800"
                          >{{ item.name }}</a
                        >
                      </div>
                    </div>
                  </div>
                </PopoverPanel>
              </TransitionChild>
            </div>
          </TransitionRoot>
        </Popover>
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

onMounted(async () => {
  console.log(routeName)
})

const navigation = [
  { name: 'Home', href: '/', mobileOnly: true },
  // { name: 'Portfolio', href: '/portfolio' },
  { name: 'Blog', href: '/blog' },
  // { name: 'About', href: '/about' },
  {
    name: 'Resume',
    href: 'https://asdx2ma4i8vdouk9.public.blob.vercel-storage.com/Shaun%20Berkley%20Resume%20June%202024-cCVQikRp7XJ2dhRJwY1NiGgavRKi8j.pdf',
    target: '_blank',
  },
]
</script>
