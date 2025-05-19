<template>
    <!-- компонент нижнего колонтитула с улучшенной адаптивностью -->
    <footer class="bg-white dark:bg-neutral-700">
        <div class="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
            <!-- Верхний блок с формой подписки -->
            <div class="mb-8 px-4 py-6 bg-neutral-200 dark:bg-neutral-600 rounded-xl">
                <!-- Скелетон загрузки -->
                <div v-if="initialLoading" class="md:flex md:justify-between md:items-center animate-pulse">
                    <div class="mb-6 md:mb-0 md:max-w-lg">
                        <div class="h-6 bg-gray-200 dark:bg-neutral-700 rounded-lg w-52 mb-3"></div>
                        <div class="h-4 bg-gray-200 dark:bg-neutral-700 rounded-lg w-64"></div>
                    </div>
                    <div class="md:max-w-md w-full">
                        <div class="flex flex-col sm:flex-row gap-2">
                            <div class="h-10 bg-gray-200 dark:bg-neutral-700 rounded-lg flex-grow"></div>
                            <div class="h-10 bg-gray-200 dark:bg-neutral-700 rounded-lg w-32"></div>
                        </div>
                    </div>
                </div>
                
                <!-- Контент формы -->
                <div v-else class="md:flex md:justify-between md:items-center">
                    <div class="mb-6 md:mb-0 md:max-w-lg">
                        <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Подпишитесь на новости</h2>
                        <p class="text-gray-600 dark:text-gray-300">Получайте уведомления о новых статьях и обновлениях.</p>
                    </div>
                    <div class="md:max-w-md w-full">
                        <form @submit.prevent="subscribeToNewsletter" class="flex flex-col sm:flex-row gap-2">
                            <input 
                                v-model="email" 
                                type="email" 
                                class="border border-neutral-400 rounded-lg px-4 py-2 flex-grow dark:bg-neutral-600 dark:border-neutral-500 dark:text-white" 
                                placeholder="Ваш email"
                                :disabled="loading"
                                required
                            >
                            <button 
                                type="submit"
                                class="border-1 border-white bg-rose-500 text-white px-5 py-2 rounded-lg hover:bg-rose-500/10 hover:border-rose-500 hover:text-rose-500 transition-colors shadow-md"
                                :disabled="loading || !isValidEmail"
                            >
                                <span v-if="!loading">Подписаться</span>
                                <span v-else class="flex items-center justify-center">
                                    <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Отправка...
                                </span>
                            </button>
                        </form>
                        <p v-if="error" class="mt-2 text-sm text-red-600 dark:text-red-400">{{ error }}</p>
                    </div>
                </div>
            </div>
            
            <!-- Основной блок футера -->
            <div class="md:flex md:justify-between">
                <div class="mb-8 md:mb-0">
                    <NuxtLink to="/" class="flex items-center">
                        <img src="/logo.svg" class="h-10 mr-4" alt="EvgeniaDesign Logo" />
                        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                            EvgeniaDesign
                        </span>
                    </NuxtLink>
                    <p class="mt-4 max-w-xs text-balance text-neutral-600 dark:text-neutral-400">
                        Онлайн-платформа для изучения основных аспектов дизайна.
                    </p>
                    <div class="flex mt-6 space-x-4">
                        <a href="#" class="text-neutral-400 hover:text-rose-500 dark:hover:text-rose-500 transition-colors duration-300">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22,7H13V2H11V7H2V9H11V14H13V9H22V7Z"/></svg>
                            <span class="sr-only">Twitter</span>
                        </a>
                        <a href="#" class="text-neutral-400 hover:text-rose-500 dark:hover:text-rose-500 transition-colors duration-300">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z"/></svg>
                            <span class="sr-only">Facebook</span>
                        </a>
                        <a href="#" class="text-neutral-400 hover:text-rose-500 dark:hover:text-rose-500 transition-colors duration-300">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M10,15L15.19,12L10,9V15M21.56,7.17C21.69,7.64 21.78,8.27 21.84,9.07C21.91,9.87 21.94,10.56 21.94,11.16L22,12C22,14.19 21.84,15.8 21.56,16.83C21.31,17.73 20.73,18.31 19.83,18.56C19.36,18.69 18.5,18.78 17.18,18.84C15.88,18.91 14.69,18.94 13.59,18.94L12,19C7.81,19 5.2,18.84 4.17,18.56C3.27,18.31 2.69,17.73 2.44,16.83C2.31,16.36 2.22,15.73 2.16,14.93C2.09,14.13 2.06,13.44 2.06,12.84L2,12C2,9.81 2.16,8.2 2.44,7.17C2.69,6.27 3.27,5.69 4.17,5.44C4.64,5.31 5.5,5.22 6.82,5.16C8.12,5.09 9.31,5.06 10.41,5.06L12,5C16.19,5 18.8,5.16 19.83,5.44C20.73,5.69 21.31,6.27 21.56,7.17Z"/></svg>
                            <span class="sr-only">YouTube</span>
                        </a>
                        <a href="#" class="text-neutral-400 hover:text-rose-500 dark:hover:text-rose-500 transition-colors duration-300">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z"/></svg>
                            <span class="sr-only">Instagram</span>
                        </a>
                        <a href="#" class="text-neutral-400 hover:text-rose-500 dark:hover:text-rose-500 transition-colors duration-300">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"/></svg>
                            <span class="sr-only">GitHub</span>
                        </a>
                    </div>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-4 md:mt-0">
                    <div>
                        <h2 class="mb-4 text-sm font-semibold text-neutral-900 uppercase dark:text-white">Навигация</h2>
                        <ul class="text-neutral-600 dark:text-neutral-400 space-y-3">
                            <li>
                                <NuxtLink to="/blog" class="inline-block hover:text-rose-500 dark:hover:text-rose-500 transition-colors duration-300">Блог</NuxtLink>
                            </li>
                            <li>
                                <NuxtLink to="/about" class="inline-block hover:text-rose-500 dark:hover:text-rose-500 transition-colors duration-300">О нас</NuxtLink>
                            </li>
                            <li>
                                <NuxtLink to="/contact" class="inline-block hover:text-rose-500 dark:hover:text-rose-500 transition-colors duration-300">Контакты</NuxtLink>
                            </li>
                            <li>
                                <NuxtLink to="/portfolio" class="inline-block hover:text-rose-500 dark:hover:text-rose-500 transition-colors duration-300">Портфолио</NuxtLink>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 class="mb-4 text-sm font-semibold text-neutral-900 uppercase dark:text-white">Категории</h2>
                        <ul class="text-neutral-600 dark:text-neutral-400 space-y-3">
                            <li>
                                <NuxtLink to="/sovety-po-dizajnu" class="inline-block hover:text-rose-500 dark:hover:text-rose-500 transition-colors duration-300">Советы по дизайну</NuxtLink>
                            </li>
                            <li>
                                <NuxtLink to="/stili-v-interere" class="inline-block hover:text-rose-500 dark:hover:text-rose-500 transition-colors duration-300">Стили в интерьере</NuxtLink>
                            </li>
                            <li>
                                <NuxtLink to="/svet" class="inline-block hover:text-rose-500 dark:hover:text-rose-500 transition-colors duration-300">Свет</NuxtLink>
                            </li>
                            <li>
                                <NuxtLink to="/blog" class="inline-block hover:text-rose-500 dark:hover:text-rose-500 transition-colors duration-300">Все статьи</NuxtLink>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 class="mb-4 text-sm font-semibold text-neutral-900 uppercase dark:text-white">Правовая информация</h2>
                        <ul class="text-neutral-600 dark:text-neutral-400 space-y-3">
                            <li>
                                <a href="#" class="inline-block hover:text-rose-500 dark:hover:text-rose-500 transition-colors duration-300">Политика конфиденциальности</a>
                            </li>
                            <li>
                                <a href="#" class="inline-block hover:text-rose-500 dark:hover:text-rose-500 transition-colors duration-300">Правила &amp; Условия</a>
                            </li>
                            <li>
                                <a href="#" class="inline-block hover:text-rose-500 dark:hover:text-rose-500 transition-colors duration-300">Файлы cookie</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <hr class="my-8 border-neutral-200 dark:border-neutral-700" />
            <div class="sm:flex sm:items-center sm:justify-between">
                <span class="text-sm text-neutral-500 sm:text-center dark:text-neutral-400">
                    EvgeniaDesign © {{ new Date().getFullYear() }} | Все права защищены.
                </span>
                <div class="flex flex-wrap justify-center gap-2 mt-4 sm:mt-0">
                    <a href="#" class="text-neutral-500 hover:text-rose-500 dark:hover:text-rose-500 transition-colors duration-300">
                        Карта сайта
                    </a>
                    <span class="text-neutral-500 mx-2">|</span>
                    <a href="#" class="text-neutral-500 hover:text-rose-500 dark:hover:text-rose-500 transition-colors duration-300">
                        Обратная связь
                    </a>
                    <span class="text-neutral-500 mx-2">|</span>
                    <a href="#" class="text-neutral-500 hover:text-rose-500 dark:hover:text-rose-500 transition-colors duration-300">
                        Поддержка
                    </a>
                </div>
            </div>
        </div>
    </footer>
    
    <!-- Модальное окно успешной подписки -->
    <Teleport to="body">
        <div v-if="showSuccessModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div class="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full shadow-xl transform transition-all">
                <div class="flex items-center justify-center mb-4 text-green-500">
                    <svg class="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                    </svg>
                </div>
                <h3 class="text-xl font-bold text-center mb-2 text-gray-900 dark:text-white">Подписка оформлена!</h3>
                <p class="text-gray-600 dark:text-gray-300 text-center mb-6">
                    Спасибо за подписку на наши новости! Теперь вы будете получать актуальные обновления.
                </p>
                <div class="flex justify-center">
                    <button 
                        @click="closeSuccessModal" 
                        class="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-500 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    >
                        Отлично!
                    </button>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<script setup>
// Состояние формы
const email = ref('')
const loading = ref(false)
const initialLoading = ref(true)
const error = ref('')
const showSuccessModal = ref(false)

// Валидация email
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const isValidEmail = computed(() => emailRegex.test(email.value))

// Имитация начальной загрузки для отображения скелетона
onMounted(() => {
    setTimeout(() => {
        initialLoading.value = false
    }, 800)
})

// Функция подписки на новости
const subscribeToNewsletter = async () => {
    if (!isValidEmail.value) {
        error.value = 'Пожалуйста, введите корректный email'
        return
    }
    
    loading.value = true
    error.value = ''
    
    try {
        // Отправка данных на API
        const response = await $fetch('https://55ab4659a877.vps.myjino.ru/x/api/subscribers', {
            method: 'POST',
            body: {
                data: {
                    email: email.value
                }
            }
        })
        
        // Очистка формы при успехе
        email.value = ''
        
        // Показ модального окна успеха
        showSuccessModal.value = true
    } catch (err) {
        console.error('Ошибка при подписке:', err)
        error.value = 'Произошла ошибка при оформлении подписки. Пожалуйста, попробуйте позже.'
    } finally {
        loading.value = false
    }
}

// Закрытие модального окна
const closeSuccessModal = () => {
    showSuccessModal.value = false
}
</script>