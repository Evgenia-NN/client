<template>
    <h1 class="my-4 text-2xl text-blue-700 darl:blue-500 font-medium">{{ id }}</h1>
    <div class="max-w-3xl mx-auto text-white">
        <div v-if="article.image"
        :style="'background-image: url(http://localhost:1338' + article.image.url + ')'"
        class="h-80 bg-auto bg-top bg-fixed bg-no-repeat rounded-4xl"
        >
        </div>
        <h1 class="text-4xl font-medium my-2">{{ article.title }}</h1>
        <p v-if="article" class="opacity-50 my-1.5">
            <span>{{ article.body ? calculateReadingTime(article.body) : 0 }}</span> •
            <span v-html="article.view || 0"></span>
            прочитано • {{ convertDatetime(article.publishedAt) }}</p>
        <!-- <div class="markdown my-1.5" v-html="body"></div> -->
        <div>{{ article.body }}</div>
    </div>
</template>

<script setup>
const article = ref([])
const index = useIndexStore();

const { id } = useRoute().params;

const fetch = async () => {
    try {
        index.loader = true;
        const res = await $fetch(`http://localhost:1338/api/articles?filters[slug][$eqi]=${id}&populate=*`);
        article.value = res.data[0];
        if (article.value) {
            updateViews(article.value.documentId);
        }
    } catch (error) {
        console.log(error);
    } finally {
        index.loader = false;
    }
};

onMounted(() => fetch())
</script>