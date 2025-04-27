<template>
    <AppLoader v-if="loader.loader" />
    <AppHeader />
    <NuxtPage />
    <AppFooter />
</template>

<script setup>
import { useIndexStore } from '~/stores'

const loader = useIndexStore();

useHead({
  htmlAttrs: {
    class: 'scroll-smooth'
  },

  title: 'EvgeniaDesign',
  meta: [
    { name: 'description', content: 'My amazing site.' }
  ],
//   bodyAttrs: {
//     class: 'bg-white dark:bg-gray-900'
//   },
})
</script>
