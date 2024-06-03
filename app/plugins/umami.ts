export default defineNuxtPlugin(() => {
  if (process.env.NUXT_ENV_PRODUCTION === 'true') {
    useHead({
      script: [
        {
          src: 'https://cloud.umami.is/script.js',
          defer: true,
          'data-website-id': '40c3592c-8431-4908-9d6c-8b845b9adc8e',
        },
      ],
    })
  }
})
