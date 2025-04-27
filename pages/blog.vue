<template>
    <h1 class="text-rose-500 text-center text-4xl font-bold p-4">Блог</h1>
    <div class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mx-40">
        <article v-for="article in articles" :key="article.id" class="flex flex-col p-5 max-w-sm bg-rose-50/50  border border-rose-500 rounded-lg shadow-sm">
           <!-- {{ article.categories[0].slug }} -->
            <NuxtLink :to="`/${article.categories[0]?.slug}/${article.slug}`" >
                <img class="rounded-lg" :src="'http://localhost:1338'+article.image.url" />
            </NuxtLink>
            <div class="inline-flex flex-col gap-3 p-2">
                <NuxtLink :to="`/${article.categories[0]?.slug}/${article.slug}`">
                    <h5 class="min-h-24 text-2xl font-bold tracking-tight text-gray-900 line-clamp-3 overflow-hidden text-ellipsis whitespace-normal ">{{ article.title }}</h5>
                </NuxtLink>
                <NuxtLink :to="`/${article.categories[0]?.slug}/${article.slug}`">
                    <p>Подробнее</p><svg class="rtl:rotate-180 w-3 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
                </NuxtLink>
            </div>
        </article>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const articles = ref([]);

// Функция для получения списка всех статей
async function fetchArticles() {
    try {
        // включаем loader
        // index.loader = true;

        const response = await fetch('http://localhost:1338/api/articles?populate=*');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const res = await response.json();
        
        articles.value = res.data; // Сохраняем полученные статьи
    } catch (error) {
        console.error('Ошибка при получении статей:', error);
    } 
    // finally {
    //     // выключаем loader
    //     index.loader = false;
    // }
}

async function loadArticles() {
    await fetchArticles(); // Загружаем статьи при инициализации
    console.log(articles.value)
}

loadArticles();

// получаем мета данные
const index = useIndexStore();
const seo = ref({})

const { data } = await useAsyncData('seo', ()  =>
  $fetch(`http://localhost:1338/api/blog?populate=*`),
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