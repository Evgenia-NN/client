<template>
    <AppHeader />
    <NuxtPage />
    <AppFooter />
</template>

<script setup>
import { useIndexStore } from '~/stores'

const loader = useIndexStore();

useHead({
  title: 'EvgeniaDesign',
  meta: [
    { name: 'description', content: 'My amazing site.' }
  ],
//   bodyAttrs: {
//     class: 'bg-white dark:bg-gray-900'
//   },
})
</script>
