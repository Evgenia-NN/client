<template>
    <!-- <header class="flex justify-between p-4 m-0 bg-[#bdc574]">
        <img class="flex font-bold w-10 h-10" src="https://cdn1.iconfinder.com/data/icons/arrows-elements-outline/128/ic_round_logo-1024.png" alt="Logo">
        <ul class=" flex gap-4 items-center">
            <li><NuxtLink to="/" active-class="active-link">Главная</NuxtLink></li>
            <li><NuxtLink to="/about" active-class="active-link">О нас</NuxtLink></li>
            <li><NuxtLink to="/contact" active-class="active-link">Контакты</NuxtLink></li>
        </ul>
        <p> </p>
    </header> -->
    <header>
        <nav class="bg-neutral-700 border-gray-200 shadow-sm dark:bg-gray-900 ">
            <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="https://flowbite.com/" class="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" />
                    <span class="text-white self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Logo</span>
                </a>
                <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <button type="button" class="text-white border-white border-1 shadow-xl hover:border-rose-500 hover:text-rose-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Начать</button>
                    <button data-collapse-toggle="navbar-cta" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-cta" aria-expanded="false">
                        <span class="sr-only">Open main menu</span>
                        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                        </svg>
                    </button>
                </div>
                <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
                    <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <NuxtLink to="/" active-class="active-link" class="text-white opacity-70 hover:underline block py-2 px-3 md:p-0 rounded-sm md:bg-transparent md:dark:text-blue-500" aria-current="page">Главная</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/about" active-class="active-link" class="text-white opacity-70 block py-2 px-3 md:p-0 rounded-sm md:hover:bg-transparent hover:underline md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">О нас</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/blog" active-class="active-link" class="text-white opacity-70 block py-2 px-3 md:p-0 rounded-sm md:hover:bg-transparent hover:underline md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Блог</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/contact" active-class="active-link" class="text-white opacity-70 block py-2 px-3 md:p-0 rounded-sm md:hover:bg-transparent hover:underline md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Контакты</NuxtLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
</template>

<style>
.active-link {
  color: oklch(0.645 0.246 16.439);
}
</style>
