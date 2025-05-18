<template>
  <NuxtLink :to="post.url" class="group">
    <div class="relative overflow-hidden rounded-lg">
      <img 
        :src="post.image" 
        :alt="post.title"
        class="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
    </div>
    <h3 class="mt-4 text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
      {{ post.title }}
    </h3>
    <p class="mt-2 text-gray-600 dark:text-gray-300">
      {{ formatDate(post.publishedAt) }}
    </p>
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>