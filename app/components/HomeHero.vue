<template>
  <div
    class="flex mx-auto max-w-4xl flex-col items-center gap-8 text-center rounded-2xl px-5 py-10 bg-white/0 backdrop-blur-xl border border-border/30 shadow-lg shadow-border/50"
  >
    <Button
      v-if="resumeUrl"
      class="rounded-full px-4 py-1.5 text-xs md:text-sm font-normal bg-white"
      variant="outline"
      :href="resumeUrl"
      target="_blank"
    >
      <div class="flex items-center gap-6">
        <div class="flex items-center gap-3">
          <div
            class="pulsating-circle relative w-3 h-3 bg-green-500 rounded-full"
          ></div>
          <div>OPEN TO WORK</div>
        </div>
        <div class="w-[1px] h-2.5 bg-muted-foreground"></div>
        <div>
          <div class="flex items-center gap-1.5">
            VIEW RESUME
            <img
              src="../assets/icons/arrow-right.svg"
              class="h-4 w-auto"
              alt=""
            />
          </div>
        </div>
      </div>
    </Button>
    <h1
      class="font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-10 flex flex-col gap-2 lg:gap-4"
      aria-label="I'm Shaun Berkley, a Frontend Engineering Leader, Engineer, Wizard, Aficionado, Mentor, Pioneer"
    >
      <div class="whitespace-nowrap">
        I'm
        <span
          class="inline-block bg-gradient-to-r from-[#1b7cfc] to-indigo-400 text-transparent bg-clip-text pb-1"
          >Shaun Berkley</span
        >,
      </div>
      <div>
        <span class="whitespace-nowrap">a Frontend</span>
        Engineering
      </div>
      <div
        class="flex items-start justify-center text-center px-6 mt-1 bg-black/5 rounded-lg md:rounded-2xl backdrop-blur-md mx-auto max-w-min overflow-hidden h-[calc(theme(fontSize.4xl)*1.36)] sm:h-[calc(theme(fontSize.5xl)*1.36)] md:h-[calc(theme(fontSize.6xl)*1.36)] lg:h-[calc(theme(fontSize.7xl)*1.36)]"
      >
        <ul
          class="whitespace-nowrap mx-auto block animate-text-slide-6 leading-tight [&_li]:block"
        >
          <li>Leader 👨🏼‍💼</li>
          <li>Wizard 🧙🏻‍♂️</li>
          <li>Expert 👨🏼‍💻</li>
          <li>Aficionado 👨🏼‍🎨</li>
          <li>Mentor 👨🏼‍🏫</li>
          <li>Pioneer 👨🏼‍🚀</li>
          <li aria-hidden="true">Leader 👨🏼‍💼</li>
        </ul>
      </div>
    </h1>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
const resumeUrl: string = config.public.NUXT_RESUME_URL
</script>
