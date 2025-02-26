<template>
    <!-- flex justify-between p-4 m-0 bg-[#bdc574] -->
    <footer class="rounded-lg dark:bg-gray-900 m-4">
        <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
            <div class="sm:flex sm:items-center sm:justify-between">
                <a href="https://flowbite.com/" class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                    <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" />
                    <span class="text-white self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Logo</span>
                </a>
                <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-white sm:mb-0 dark:text-gray-400">
                    <li>
                        <NuxtLink to="/about" class="hover:underline me-4 md:me-6">О нас</NuxtLink>
                    </li>
                    <li>
                        <a href="#" class="hover:underline me-4 md:me-6">Политика конфиденциальности</a>
                    </li>
                    <li>
                        <a href="#" class="hover:underline me-4 md:me-6">Лицензирование</a>
                    </li>
                    <li>
                        <NuxtLink to="/contact" class="hover:underline">Контакты</NuxtLink>
                    </li>
                </ul>
            </div>
            <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <span class="block text-sm text-white sm:text-center dark:text-gray-400">© 2025 <a href="https://flowbite.com/" class="hover:underline">Company™</a>. Все права защищены.</span>
        </div>
    </footer>
</template>