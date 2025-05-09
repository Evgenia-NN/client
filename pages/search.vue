<template>
    <div class="relative isolate overflow-hidden dark:bg-neutral-700">
        <h1 class="my-4 mx-40 text-4xl dark:text-white font-medium">
            Поиск <q>{{ index.search }}</q>
        </h1>
        <!-- все посты по запросу -->
        <div v-if="articles.length > 0" class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mx-40">
            <article v-for="article in articles" :key="article.id" class="flex flex-col p-5 max-w-sm bg-rose-50/50 border border-rose-500 rounded-lg shadow-sm">
                <NuxtLink :to="`/${article.categories[0]?.slug}/${article.slug}`">
                    <img class="rounded-lg" :src="'https://55ab4659a877.vps.myjino.ru/x/' + article.image.url" />
                </NuxtLink>
                <div class="inline-flex flex-col gap-3 p-2">
                    <NuxtLink :to="`/${article.categories[0]?.slug}/${article.slug}`">
                        <h5 class="min-h-24 text-2xl font-bold tracking-tight text-gray-900 line-clamp-3 overflow-hidden text-ellipsis whitespace-normal">{{ article.title }}</h5>
                    </NuxtLink>
                    <NuxtLink :to="`/${article.categories[0]?.slug}/${article.slug}`">
                        <p>Подробнее</p>
                        <svg class="rtl:rotate-180 w-3 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </NuxtLink>
                </div>
            </article>
        </div>
        <div v-else class="text-xl my-4 mx-40 dark:text-white">
            Совпадений не найдено...
        </div>
        <!-- градиент -->
        <div class="absolute top-0 left-1/2 -z-10 -translate-x-1/2 blur-3xl xl:-top-6" aria-hidden="true">
            <div class="aspect-1155/678 w-[72.1875rem] bg-linear-to-tr from-[#ff4b78] to-[#ff2056] opacity-30" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div>
        </div>
    </div> 
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
// import { useIndexStore } from ''; // Убедитесь, что путь к вашему store правильный

const index = useIndexStore();
const articles = ref([]);

// Функция для получения списка всех статей
async function fetchArticles(search) {
    try {
        // включаем loader
        index.loader = true;

        const response = await fetch(`https://55ab4659a877.vps.myjino.ru/x/api/articles?filters[$or][0][title][$containsi]=${search}&filters[$or][1][body][$containsi]=${search}&populate=*`);
        const data = await response.json(); // Получаем данные из ответа
        articles.value = data.data; // Сохраняем полученные статьи
    } catch (error) {
        console.error('Ошибка при получении статей:', error);
    } finally {
        // выключаем loader
        index.loader = false;
    }
}

// Слежение за изменением поискового запроса
watch(() => index.search, (search) => {
    fetchArticles(search);
});

// Получаем мета данные
const seo = ref({});

async function fetchSeo() {
    const { data } = await useAsyncData('seo', () =>
        $fetch(`https://55ab4659a877.vps.myjino.ru/x/api/search?populate=*`),
        { server: true }
    );

    if (data.value?.data?.seo) {
        seo.value = data.value.data.seo;
    }
}

  useHead({
        title: () => seo.value?.metaTitle ? `${seo.value?.metaTitle} | EvgeniaDesign` : 'EvgeniaDesign',
        meta: [
        { name: 'description', content: () => seo.value?.metaDescription || '' }
        ],
  });
    
onMounted(() => fetchSeo())
</script>