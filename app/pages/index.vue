<script setup lang="ts"></script>

<template>
  <main class="relative">
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
    <section class="space-y-6 py-8 md:py-10 lg:py-20 relative z-10">
      <HomeHero />
    </section>
    <section class="relative z-20 -top-[80px] md:-top-[100px]">
      <div class="absolute top-0 left-0 w-full h-full">
        <SkillBubbles />
      </div>
    </section>
    <section class="pt-40 relative z-10 mt-16 bg-slate-950/5">
      <WorkExperience />
    </section>
    <section class="relative z-20">
      <Skills />
    </section>
  </main>
</template>
