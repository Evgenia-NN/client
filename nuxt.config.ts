import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  devServer: {
    host: '0.0.0.0',
    port: 4001,
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  modules: [
    // '@nuxt/content',
    '@pinia/nuxt',
  ],
})