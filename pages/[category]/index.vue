<template>
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-3xl text-cyan-700 font-bold mb-4">{{ categoryName }}</h1>
        <p v-if="processedArticles.length > 0" class="text-gray-600 mb-6">
            В этой категории доступно {{ processedArticles.length }} {{ getNounForm(processedArticles.length, 'статья', 'статьи', 'статей') }} по теме IT и программирования
        </p>
        
        <div v-if="processedArticles.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <UiArticle 
                v-for="article in processedArticles" 
                :key="article.id" 
                :post="article" 
            />
        </div>
        <div v-else class="text-center py-10">
            <p class="text-xl text-gray-500">В данной категории пока нет статей</p>
        </div>
    </div>
</template>

<script setup>
const { category } = useRoute().params;
const index = useIndexStore();
const articles = ref([]);
const processedArticles = computed(() => {
    return articles.value
        .filter(article => article !== null)
        .map(article => validateAndFixPost(article))
        .filter(article => article !== null);
});
const categoryName = ref('');
const seo = ref({
    title: '',
    description: '',
    metaTitle: '',
    metaDescription: ''
});

const fetchArticles = async () => {
    try {
        index.loader = true;

        // Получаем данные о категории
        const categoryRes = await $fetch(`https://55ab4659a877.vps.myjino.ru/x/api/categories?filters[slug][$eq]=${category}&populate=*`).catch(() => ({ data: [] }));
        
        // Получаем данные о подкатегории (если текущий slug - это подкатегория)
        const subcategoryRes = await $fetch(`https://55ab4659a877.vps.myjino.ru/x/api/subcategories?filters[slug][$eq]=${category}&populate=articles`).catch(() => ({ data: [] }));
        
        let allArticles = [];
        let isCategory = false;
        let isSubcategory = false;
        
        // Определяем тип текущей страницы (категория или подкатегория)
        const categoryData = categoryRes.data && categoryRes.data.length > 0 ? categoryRes.data[0] : null;
        const subcategoryData = subcategoryRes.data && subcategoryRes.data.length > 0 ? subcategoryRes.data[0] : null;
        
        // Устанавливаем имя заголовка страницы
        if (categoryData) {
            categoryName.value = categoryData.name || categoryData.attributes?.name;
            isCategory = true;
            
            // Если у категории есть своя SEO информация
            if (categoryData.seo || (categoryData.attributes && categoryData.attributes.seo)) {
                seo.value = categoryData.seo || categoryData.attributes.seo || {};
            }
        } else if (subcategoryData) {
            categoryName.value = subcategoryData.name || subcategoryData.attributes?.name;
            isSubcategory = true;
            
            // Если у подкатегории есть своя SEO информация
            if (subcategoryData.seo || (subcategoryData.attributes && subcategoryData.attributes.seo)) {
                seo.value = subcategoryData.seo || subcategoryData.attributes.seo || {};
            }
        } else {
            categoryName.value = category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' ');
        }
        
        // Получаем все посты
        const articlesRes = await $fetch(`https://55ab4659a877.vps.myjino.ru/x/api/articles?populate=*`);
        
        if (articlesRes.data && articlesRes.data.length > 0) {
            if (isCategory) {
                // Фильтруем посты принадлежащие категории
                const categoryArticles = articlesRes.data.filter(article => {
                    const articleCategories = article.categories || [];
                    return articleCategories.some(cat => cat.slug === category);
                });
                
                // Нормализуем все посты категории
                categoryArticles.forEach(article => {
                    allArticles.push(normalizeArticle(article));
                });
            } else if (isSubcategory) {
                // Фильтруем посты по подкатегориям
                const subcategoryArticles = articlesRes.data.filter(article => {
                    // Некоторые посты могут иметь разную структуру данных
                    const articleSubcategories = article.subcategories || [];
                    
                    // Проверяем наличие подкатегории по slug
                    const hasSubcategory = articleSubcategories.some(subcat => 
                        subcat.slug === category || 
                        (subcat.attributes && subcat.attributes.slug === category)
                    );
                    
                    return hasSubcategory;
                });
                
                // Нормализуем все посты подкатегории
                subcategoryArticles.forEach(article => {
                    allArticles.push(normalizeArticle(article));
                });
                
                // Если у подкатегории есть связанные посты
                if (subcategoryData && subcategoryData.articles && subcategoryData.articles.length > 0) {
                    // Добавляем посты из подкатегории
                    subcategoryData.articles.forEach(subArticle => {
                        // Нормализуем пост, если он имеет другую структуру
                        const normalizedArticle = normalizeArticle(subArticle);
                        
                        // Проверяем наличие поста в уже собранных
                        if (!allArticles.some(article => article.id === normalizedArticle.id)) {
                            allArticles.push(normalizedArticle);
                        }
                    });
                }
                
                // Если в подкатегории нет данных, запрашиваем дополнительно посты через фильтр API
                if (allArticles.length === 0) {
                    try {
                        const subcategoryArticlesRes = await $fetch(
                            `https://55ab4659a877.vps.myjino.ru/x/api/articles?filters[subcategories][slug][$eq]=${category}&populate=*`
                        );
                        
                        if (subcategoryArticlesRes.data && subcategoryArticlesRes.data.length > 0) {
                            subcategoryArticlesRes.data.forEach(article => {
                                const normalizedArticle = normalizeArticle(article);
                                if (!allArticles.some(p => p.id === normalizedArticle.id)) {
                                    allArticles.push(normalizedArticle);
                                }
                            });
                        }
                    } catch (err) {
                        console.error('Ошибка при загрузке постов подкатегории:', err);
                    }
                }
            } else {
                // Фильтруем посты по обоим условиям, если тип не определен
                const mixedArticles = postsRes.data.filter(article => {
                    const postCategories = article.categories || [];
                    const postSubcategories = article.subcategories || [];
                    
                    return postCategories.some(cat => cat.slug === category) ||
                           postSubcategories.some(subcat => subcat.slug === category);
                });
                
                // Нормализуем все найденные посты
                mixedArticles.forEach(article => {
                    allArticles.push(normalizeArticle(article));
                });
            }
        }
        
        articles.value = allArticles;
        
        // Получаем SEO данные
        try {
            const seoRes = await $fetch(`https://55ab4659a877.vps.myjino.ru/x/api/global?populate=*`);
            if (seoRes.data?.seo && Object.keys(seo.value).length === 0) {
                seo.value = seoRes.data.seo;
            }
        } catch (seoError) {
            console.error('Ошибка при загрузке SEO данных:', seoError);
        }
        
        // Настраиваем SEO-метаданные для страницы категории
        setupSeo();
    } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
        
        // Устанавливаем тестовые данные в случае ошибки
        categoryName.value = category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' ');
        articles.value = [];
        setupSeo();
    } finally {
        index.loader = false;
    }
}

// Функция для проверки корректности поста перед отображением
const validateArticle = (article) => {
    if (!article || typeof article !== 'object') return false;
    
    // Проверяем наличие основных полей
    if (!article.id) return false;
    
    // Пост должен иметь заголовок или slug
    return Boolean(article.title || article.slug);
};

// Нормализует структуру поста, если она отличается от стандартной
const normalizeArticle = (article) => {
    let normalizeArticle;
    
    // Обработка нового формата API (Strapi v4)
    if (post.attributes) {
        normalizeArticle = { 
            ...article.attributes,
            id: article.id
        };
        
        // Нормализация slug, если его нет
        if (!normalizedPost.slug) {
            normalizedPost.slug = normalizedPost.title
                ? slugify(normalizedPost.title.toLowerCase())
                : `post-${normalizedPost.id}`;
        }
    } else {
        // Старый формат или уже нормализованный пост
        normalizedPost = { ...article };
        
        // Нормализация slug, если его нет
        if (!normalizedPost.slug) {
            normalizedPost.slug = normalizedPost.title
                ? slugify(normalizedPost.title.toLowerCase())
                : `post-${normalizedPost.id}`;
        }
    }
    
    // Убедимся, что categories всегда является массивом
    if (!normalizedPost.categories) {
        normalizedPost.categories = [];
    } else if (normalizedPost.categories && !Array.isArray(normalizedPost.categories) && !normalizedPost.categories.data) {
        normalizedPost.categories = [normalizedPost.categories];
    }
    
    // Проверка наличия обложки и преобразование в стандартный формат
    if (!normalizedPost.cover) {
        normalizedPost.cover = { url: '/cover.webp' };
    } else if (typeof normalizedPost.cover === 'string') {
        // Если путь из Strapi (начинается с /uploads/)
        if (normalizedPost.cover.startsWith('/uploads/')) {
            normalizedPost.cover = { url: `https://55ab4659a877.vps.myjino.ru/x/${normalizedPost.cover}` };
        }
        // Если локальный путь (заглушка), не из Strapi
        else if (normalizedPost.cover.startsWith('/') && !normalizedPost.cover.startsWith('/uploads/')) {
            normalizedPost.cover = { url: normalizedPost.cover };
        }
        // Если начинается с http, это абсолютный URL
        else if (normalizedPost.cover.startsWith('http')) {
            normalizedPost.cover = { url: normalizedPost.cover };
        }
        // Иначе это ссылка от Strapi без начального слеша, добавляем префикс
        else {
            normalizedPost.cover = { url: `https://55ab4659a877.vps.myjino.ru/x${normalizedPost.cover}` };
        }
    }
    // Если cover уже объект с полем url, проверяем его формат
    else if (normalizedPost.cover.url) {
        // Если путь из Strapi (начинается с /uploads/)
        if (normalizedPost.cover.url.startsWith('/uploads/')) {
            normalizedPost.cover.url = `https://static.dublecode.ru${normalizedPost.cover.url}`;
        }
        // Если локальный путь (заглушка), не из Strapi
        else if (normalizedPost.cover.url.startsWith('/') && !normalizedPost.cover.url.startsWith('/uploads/')) {
            // Оставляем как есть
        }
        // Если начинается с http, это абсолютный URL
        else if (normalizedPost.cover.url.startsWith('http')) {
            // Оставляем как есть
        }
        // Иначе это ссылка от Strapi без начального слеша, добавляем префикс
        else {
            normalizedPost.cover.url = `https://static.dublecode.ru/${normalizedPost.cover.url}`;
        }
    }
    
    return normalizedPost;
}

// Дополнительная проверка и исправление полей поста
const validateAndFixPost = (post) => {
    if (!article) return null;
    
    try {
        // Проверяем наличие всех необходимых полей и приводим их к ожидаемому формату
        const validatedPost = { ...article };
        
        // Проверяем ключевые поля, использующиеся в UiArticle
        if (!validatedPost.title) validatedPost.title = 'Без названия';
        if (!validatedPost.slug) validatedPost.slug = '';
        
        // Проверяем поле cover
        if (!validatedPost.cover) {
            validatedPost.cover = { url: '/cover.webp' };
        } else if (typeof validatedPost.cover === 'object') {
            // Если URL отсутствует или пустой
            if (!validatedPost.cover.url) {
                validatedPost.cover.url = '/cover.webp';
            }
            // Если URL из Strapi (начинается с /uploads/)
            else if (validatedPost.cover.url.startsWith('/uploads/')) {
                validatedPost.cover.url = `https://static.dublecode.ru${validatedPost.cover.url}`;
            }
            // Если URL локальный из Nuxt.js (например, заглушка)
            else if (validatedPost.cover.url.startsWith('/') && !validatedPost.cover.url.startsWith('/uploads/')) {
                // Оставляем как есть
            }
            // Если URL начинается с http, это абсолютный URL
            else if (validatedPost.cover.url.startsWith('http')) {
                // Оставляем как есть
            }
            // Иначе это ссылка от Strapi без начального слеша, добавляем префикс
            else {
                validatedPost.cover.url = `https://static.dublecode.ru/${validatedPost.cover.url}`;
            }
        } else if (typeof validatedPost.cover === 'string') {
            // Если строка из Strapi (начинается с /uploads/)
            if (validatedPost.cover.startsWith('/uploads/')) {
                validatedPost.cover = { url: `https://static.dublecode.ru${validatedPost.cover}` };
            }
            // Если строка локальная из Nuxt.js (например, заглушка)
            else if (validatedPost.cover.startsWith('/') && !validatedPost.cover.startsWith('/uploads/')) {
                validatedPost.cover = { url: validatedPost.cover };
            }
            // Если строка начинается с http, это абсолютный URL
            else if (validatedPost.cover.startsWith('http')) {
                validatedPost.cover = { url: validatedPost.cover };
            }
            // Иначе это ссылка от Strapi без начального слеша, добавляем префикс
            else {
                validatedPost.cover = { url: `https://static.dublecode.ru/${validatedPost.cover}` };
            }
        } else {
            validatedPost.cover = { url: '/cover.webp' };
        }
        
        return validatedPost;
    } catch (error) {
        console.error('Ошибка при валидации поста:', error, post);
        return null;
    }
}

// Функция настройки SEO-метаданных
const setupSeo = () => {
    // Определяем основные SEO-данные
    const title = seo.value.metaTitle || `${categoryName.value} | PlusPixel - IT образование`;
    const description = seo.value.metaDescription || 
        `Материалы по теме "${categoryName.value}" для IT-специалистов и начинающих программистов. ${posts.value.length > 0 ? `Доступно ${posts.value.length} обучающих статей.` : 'Изучайте программирование и веб-разработку с нашими материалами.'}`;
    const canonicalUrl = `https://pluspixel.ru/${category}`;
    
    // Определяем ключевые слова в зависимости от категории
    let keywordsArray = [
        categoryName.value, 
        'IT образование', 
        'программирование', 
        'разработка', 
        'обучение', 
        'веб-технологии', 
        'блог', 
        'PlusPixel'
    ];
    
    // Настраиваем расширенную SEO-конфигурацию
    useSeoMeta({
        // Основные метатеги
        title: title,
        description: description,
        
        // Open Graph метатеги
        ogTitle: title,
        ogDescription: description,
        ogType: 'website',
        ogUrl: canonicalUrl,
        ogSiteName: 'PlusPixel',
        ogLocale: 'ru_RU',
        
        // Twitter Card метатеги
        twitterTitle: title,
        twitterDescription: description,
        twitterCard: 'summary',
        
        // Другие метатеги
        robots: 'index, follow',
        canonical: canonicalUrl,
        keywords: keywordsArray.join(', '),
    });
    
    // Добавляем структурированные данные (JSON-LD)
    useHead({
        script: [
            {
                type: 'application/ld+json',
                innerHTML: JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'CollectionPage',
                    name: title,
                    description: description,
                    url: canonicalUrl,
                    mainEntity: {
                        '@type': 'ItemList',
                        itemListElement: processedPosts.value.map((post, index) => ({
                            '@type': 'ListItem',
                            position: index + 1,
                            url: `https://pluspixel.ru/${category}/${post.slug || ''}`
                        }))
                    },
                    about: {
                        "@type": "Thing",
                        "name": categoryName.value,
                        "description": `Обучающие материалы по теме "${categoryName.value}" в сфере IT`
                    },
                    publisher: {
                        "@type": "Organization",
                        "name": "PlusPixel",
                        "logo": {
                            "@type": "ImageObject",
                            "url": "https://pluspixel.ru/favicon.ico"
                        }
                    }
                })
            }
        ]
    });
}

// Функция для правильного склонения существительных
const getNounForm = (number, one, two, five) => {
    let n = Math.abs(number);
    n %= 100;
    if (n >= 5 && n <= 20) {
        return five;
    }
    n %= 10;
    if (n === 1) {
        return one;
    }
    if (n >= 2 && n <= 4) {
        return two;
    }
    return five;
};

onMounted(() => fetchPosts())
</script>