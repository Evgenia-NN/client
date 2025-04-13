<template>
    <h1 class="text-rose-500 text-center text-4xl font-bold p-4">Контакты</h1>
    <AppFeedback />
</template>

<script setup>
// получаем мета данные
const index = useIndexStore();
const seo = ref({})

const { data } = await useAsyncData('seo', ()  =>
  $fetch(`http://localhost:1338/api/contact?populate=*`),
  { server: true }
  );

  if (data.value?.data?.seo) {
      seo.value = data.value.data.seo;
  }

  useHead({
        title: () => seo.value?.metaTitle ? `${seo.value?.metaTitle} | EvgeniaDesign` : 'EvgeniaDesign',
        meta: [
        { name: 'description', content: () => seo.value?.metaDescription || '' }
        ],
  });
</script>