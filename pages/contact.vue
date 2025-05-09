<template>
  <div class="relative isolate overflow-hidden dark:bg-neutral-700">
      <h1 class="text-rose-500 text-center text-4xl font-bold p-4">Контакты</h1>
      <section class="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-4 mx-40 py-8">
        <!-- левая колонка -->
        <div class="flex flex-col gap-4 dark:text-white text-black p-4 w-100 md:py-8">
          <p class="text-xl font-bold py-3">Наши контакты для связи с нами:</p>
          <p class="opacity-80">+7 (900) 000-00-00</p>
          <p class="opacity-80">EvgeniaDesign@mail.ru</p>
          <p class="text-xl font-bold py-3">Наша студия находится по адресу:</p>
          <p class="opacity-80">г. Сочи, Центральный район, ул. Навагинская, 9Д, офис 216, 3 этаж</p>
        </div>
        <!-- правая колонка с формой -->
        <div>
          <AppFeedback />
        </div>
        <!-- градиент -->
        <div class="absolute top-0 left-1/2 -z-10 -translate-x-1/2 blur-3xl xl:-top-6" aria-hidden="true">
          <div class="aspect-1155/678 w-[72.1875rem] bg-linear-to-tr from-[#ff4b78] to-[#ff2056] opacity-30" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div>
        </div>
      </section>
    </div>
</template>

<script setup>
// получаем мета данные
const index = useIndexStore();
const seo = ref({})

const { data } = await useAsyncData('seo', ()  =>
  $fetch(`https://55ab4659a877.vps.myjino.ru/x/api/contact?populate=*`),
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