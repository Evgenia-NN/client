<template>
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
        <div class="markdown my-1.5" v-html="body"></div>
        <!-- <div>{{ article.body }}</div> -->
    </div>
</template>

<script setup>
function convertDatetime(isoDatetime) {
    // Создаем объект Date из строки
    const date = new Date(isoDatetime);
    // Определяем массив с русскими названиями месяцев
    const months = [
        "янв", "фев", "мар", "апр", "май", "июн",
        "июл", "авг", "сен", "окт", "ноя", "дек"
    ];
    // Получаем компоненты даты
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = months[date.getUTCMonth()];
    const year = date.getUTCFullYear();
    // Форматируем строку
    return `${day} ${month} ${year}`;
}

const { id } = useRoute().params;
// const post = ref({})


const article = ref({})
// const index = useIndexStore();

import markdownit from 'markdown-it'
const md = markdownit()
const body = ref()
watch(article, (newArticle) => {
    body.value = md.render(newArticle.body);
    
})
// const seo = ref({})

const fetch = async () => {
    try {
        // index.loader = true;
        const res = await $fetch(`http://localhost:1338/api/articles?filters[slug][$eqi]=${id}&populate=*`);
        article.value = res.data[0];
        if (article.value) {
            updateViews(article.value.documentId);
            // seo.value = res.data[0].seo;
            // useSeoMeta({
            //   title: `${seo.value.metaTitle} | Секреты Шефа`,
            //   description: seo.value.metaDescription,
            //   ogTitle: seo.value.metaTitle,
            //   ogDescription: seo.value.metaDescription,
            // });
        }
    } catch (error) {
        console.log(error);
    } finally {
        // index.loader = false;
    }
};

const updateViews = async (documentId) => {
    await $fetch(`http://localhost:1338/api/articles/${documentId}?populate=*`, {
        method: 'PUT',
        body: {
            data: {
                view: (article.value.view || 0) + 1,
            },
        },
    });
};

function calculateReadingTime(text, wordsPerMinute = 200) {
    // Удаляем лишние пробелы и разбиваем текст на слова
    const words = text.trim().split(/\s+/).length;
    // Рассчитываем время чтения в минутах
    const readingTime = Math.ceil(words / wordsPerMinute);
    // Возвращаем строку с указанием времени чтения
    if (readingTime === 1) {
        return `${readingTime} минута`;
    } else if (readingTime > 1 && readingTime < 5) {
        return `${readingTime} минуты`;
    } else {
        return `${readingTime} минут`;
    }
}

onMounted(() => fetch())
</script>