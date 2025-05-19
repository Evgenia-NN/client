<!-- страница с отдельной работой -->
<template>
    <div class="bg-white dark:bg-neutral-700">
    <!-- Контейнер для содержимого статьи с максимальной шириной и центрированием -->
        <div class="max-w-7xl mx-auto px-4 text-black dark:text-white">
            <!-- Индикатор загрузки -->
            <div v-if="isLoading" class="flex justify-center items-center py-10">
                <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
            </div>
        
            <!-- Сообщение об ошибке -->
            <div v-else-if="error" class="py-10 text-center">
                <h2 class="text-2xl font-bold text-red-500 mb-2">Ошибка загрузки статьи</h2>
                <p>{{ error }}</p>
                <button @click="fetch" class="mt-4 px-5 py-2 bg-cyan-500 rounded hover:bg-cyan-600 transition">
                    Повторить попытку
                </button>
            </div> 

            <!-- изображение -->
            <div v-if="article.image"
                :style="'background-image: url(https://55ab4659a877.vps.myjino.ru/x' + article.image.url + ')'"
                class="h-120 bg-cover bg-center bg-fixed bg-no-repeat rounded-4xl">
            </div>

            <!-- заголовок статьи -->
            <h1 class="text-4xl font-medium my-2">{{ article.name }}</h1>

            <!-- количество прочитано -->
            <p v-if="article" class="opacity-50 my-1.5">
                <span>{{ article.body ? calculateReadingTime(article.body) : 0 }}</span> •
                <span v-html="article.view || 0"></span>
                прочитано • {{ convertDatetime(article.publishedAt) }}
            </p>
                
            <!-- Кнопки "Поделиться" -->
            <div class="flex gap-2 mb-6">
                <button @click="shareOnSocial('telegram')" class="cursor-pointer bg-blue-500 hover:bg-blue-600 p-2 rounded transition">
                    <svg class="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M2.14753 11.8099C7.3949 9.52374 10.894 8.01654 12.6447 7.28833C17.6435 5.20916 18.6822 4.84799 19.3592 4.83606C19.5081 4.83344 19.8411 4.87034 20.0567 5.04534C20.2388 5.1931 20.2889 5.39271 20.3129 5.5328C20.3369 5.6729 20.3667 5.99204 20.343 6.2414C20.0721 9.08763 18.9 15.9947 18.3037 19.1825C18.0514 20.5314 17.5546 20.9836 17.0736 21.0279C16.0283 21.1241 15.2345 20.3371 14.2221 19.6735C12.6379 18.635 11.7429 17.9885 10.2051 16.9751C8.42795 15.804 9.58001 15.1603 10.5928 14.1084C10.8579 13.8331 15.4635 9.64397 15.5526 9.26395C15.5637 9.21642 15.5741 9.03926 15.4688 8.94571C15.3636 8.85216 15.2083 8.88415 15.0962 8.9096C14.9373 8.94566 12.4064 10.6184 7.50365 13.928C6.78528 14.4212 6.13461 14.6616 5.55163 14.649C4.90893 14.6351 3.67265 14.2856 2.7536 13.9869C1.62635 13.6204 0.730432 13.4267 0.808447 12.8044C0.849081 12.4803 1.29544 12.1488 2.14753 11.8099Z"></path></svg>
                </button>
                <button @click="shareOnSocial('vk')" class="cursor-pointer bg-[#4C75A3] hover:bg-[#3B5998] p-2 rounded transition">
                    <svg class="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M4.26 4.26C3 5.532 3 7.566 3 11.64V12.36C3 16.428 3 18.462 4.26 19.74C5.532 21 7.566 21 11.64 21H12.36C16.428 21 18.462 21 19.74 19.74C21 18.468 21 16.434 21 12.36V11.64C21 7.572 21 5.538 19.74 4.26C18.468 3 16.434 3 12.36 3H11.64C7.572 3 5.538 3 4.26 4.26ZM6.03613 8.47817H8.10013C8.16613 11.9102 9.67813 13.3622 10.8781 13.6622V8.47817H12.8161V11.4362C13.9981 11.3102 15.2461 9.96017 15.6661 8.47217H17.5981C17.4406 9.24243 17.1259 9.97193 16.6737 10.6151C16.2216 11.2582 15.6416 11.8012 14.9701 12.2102C15.7195 12.5831 16.3813 13.1107 16.9118 13.7582C17.4424 14.4056 17.8297 15.1581 18.0481 15.9662H15.9181C15.4621 14.5442 14.3221 13.4402 12.8161 13.2902V15.9662H12.5821H12.5761C8.47213 15.9662 6.13213 13.1582 6.03613 8.47817Z"></path></svg>
                </button>
                <button @click="copyCurrentUrl" class="cursor-pointer bg-gray-600 hover:bg-gray-700 p-2 rounded transition relative" :class="{ 'bg-green-500': copied }">
                    <svg class="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M6.9998 6V3C6.9998 2.44772 7.44752 2 7.9998 2H19.9998C20.5521 2 20.9998 2.44772 20.9998 3V17C20.9998 17.5523 20.5521 18 19.9998 18H16.9998V20.9991C16.9998 21.5519 16.5499 22 15.993 22H4.00666C3.45059 22 3 21.5554 3 20.9991L3.0026 7.00087C3.0027 6.44811 3.45264 6 4.00942 6H6.9998ZM5.00242 8L5.00019 20H14.9998V8H5.00242ZM8.9998 6H16.9998V16H18.9998V4H8.9998V6Z"></path></svg>
                    <span v-if="copied" class="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black px-2 py-1 rounded text-xs">
                        Скопировано!
                    </span>
                </button>
            </div>

            <!-- контент статьи -->
            <div v-if="body" class="markdown prose prose-cyan dark:prose-invert max-w-none my-6" v-html="body" ref="markdownContainer"></div>
        </div>
    </div>
</template>

<script setup>
// Преобразует дату в формате ISO в читаемый формат "день месяц год"
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

const article = ref({})
const index = useIndexStore();
const isLoading = ref(false)
const error = ref(null)
const copied = ref(false)

import markdownit from 'markdown-it'
const md = markdownit()
const body = ref()
watch(article, (newArticle) => {
    body.value = md.render(newArticle.body);
    
})

const fetch = async () => {
    try {
        isLoading.value = true;
        error.value = null;
        const res = await $fetch(`https://55ab4659a877.vps.myjino.ru/x/api/works?filters[slug][$eqi]=${id}&populate=*`);
        article.value = res.data[0];
        if (article.value) {
            updateViews(article.value.documentId);
        }
    } catch (err) {
        error.value = err.message || 'Произошла ошибка при загрузке статьи';
        console.log(err);
    } finally {
        isLoading.value = false;
    }
};

const updateViews = async (documentId) => {
    await $fetch(`https://55ab4659a877.vps.myjino.ru/x/api/works/${documentId}?populate=*`, {
        method: 'PUT',
        body: {
            data: {
                view: (article.value.view || 0) + 1,
            },
        },
    });
};

// Рассчитывает примерное время чтения статьи
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

// получаем мета данные
const seo = ref({})

const { data } = await useAsyncData('seo', ()  =>
  $fetch(`https://55ab4659a877.vps.myjino.ru/x/api/portfolio?populate=*`),
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

// Добавляем функцию для копирования URL
const copyCurrentUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    copied.value = true;
    setTimeout(() => {
        copied.value = false;
    }, 2000);
};

onMounted(() => fetch())
</script>