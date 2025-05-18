<template>
    <div class="relative isolate overflow-hidden bg-neutral-700">
        <h1 class="text-rose-500 text-center text-4xl font-bold p-4">{{ articles.name }}</h1>
        <div v-if="posts.length" class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mx-40 py-8">
            <article v-for="article in posts" :key="article.id" class="flex flex-col p-5 max-w-sm bg-rose-50/50 border border-rose-500 rounded-lg shadow-sm">
                <div class="inline-flex flex-col gap-3 p-2">
                    <NuxtLink :to="`/${articles.slug}/${article.slug}`">
                        <h5 class="min-h-24 text-2xl font-bold tracking-tight text-gray-900 line-clamp-3 overflow-hidden text-ellipsis whitespace-normal">{{ article.title }}</h5>
                    </NuxtLink> 
                </div>
            </article>
        </div>
        <div class="absolute top-0 left-1/2 -z-10 -translate-x-1/2 blur-3xl xl:-top-6" aria-hidden="true">
            <div class="aspect-1155/678 w-[72.1875rem] bg-linear-to-tr from-[#ff4b78] to-[#ff2056] opacity-30" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router'; // Импортируйте useRoute

const { category } = useRoute().params;
const index = useIndexStore();
const articles = ref({});
const posts = ref([]);

async function fetchArticles() {
    try {
        index.loader = true;
        const response = await fetch(`https://55ab4659a877.vps.myjino.ru/x/api/categories?filters[slug][$eqi]=${category}&populate=*`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const res = await response.json();
        articles.value = res.data[0];
        posts.value = res.data[0].articles;
    } catch (error) {
        console.error('Ошибка при получении статей:', error);
    } finally {
        index.loader = false;
    }
}

onMounted(() => {
    fetchArticles();
});

const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const months = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

const seo = ref({});

onMounted(async () => {
    const { data } = await useAsyncData('seo', () =>
        $fetch(`https://55ab4659a877.vps.myjino.ru/x/api/blog?populate=*`),
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
});
</script>