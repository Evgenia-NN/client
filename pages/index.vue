<template>
  <div class="py-6 dark:bg-neutral-700">
    <!-- Блок 1: Приветственный баннер -->
    <section
      class=" text-white mx-auto w-full max-w-screen-xl px-4 lg:py-8">
      <div class="container mx-auto px-4 py-6 sm:py-8 md:py-12 bg-gradient-to-r from-[#ff4b78] to-[#ff2056] rounded-lg shadow-lg">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Студия дизайна интерьера EvgeniaDesign</h1>
          <p class="text-base sm:text-lg mb-6 sm:mb-8 text-white/90">Создаем пространство, где стиль встречает комфорт!</p>
          <div class="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <NuxtLink to="/blog"
              class="bg-white text-rose-500 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium hover:bg-white/20 hover:text-white transition-colors shadow-md text-sm sm:text-base">
              Читать блог
            </NuxtLink>
            <NuxtLink to="/about"
              class="bg-transparent border-2 border-white text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium hover:bg-white/20 transition-colors text-sm sm:text-base">
              О нас
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Блок с работами -->
    <section class="mx-auto w-full max-w-screen-xl px-4 lg:py-8 dark:text-white">
      <div class="container mx-auto">
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-3xl font-bold sm:text-4xl text-center dark:text-white">Наши работы</h1>
          <NuxtLink to="/portfolio" class="flex items-center gap-2 dark:text-white hover:text-rose-600 text-sm sm:text-base">
            Смотреть все
            <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
            </svg>
          </NuxtLink>
        </div>
        
        <div v-if="isLoading" class="grid place-items-center py-10">
          <div class="w-10 h-10 border-4 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        
        <div v-else-if="works.length === 0" class="text-center py-10">
          <p class="text-gray-500 dark:text-gray-400">Работы не найдены</p>
        </div>
        
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <article v-for="work in works.slice(0, 4)" :key="work.id" class="flex flex-col p-4 sm:p-5 max-w-sm bg-rose-50/50 border border-rose-500 rounded-lg shadow-sm text-black">
            <NuxtLink :to="`/portfolio/${work.slug}`">
              <img class="h-32 sm:h-40 w-full object-cover rounded-lg" :src="'https://55ab4659a877.vps.myjino.ru/x'+work.image.url" />
            </NuxtLink>
            <div class="inline-flex flex-col gap-2 sm:gap-3 p-2">
              <NuxtLink :to="`/portfolio/${work.slug}`">
                <h5 class="min-h-16 sm:min-h-24 text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-gray-900 line-clamp-3 overflow-hidden text-ellipsis whitespace-normal">{{ work.name }}</h5>
              </NuxtLink>
              <NuxtLink :to="`/portfolio/${work.slug}`" class="flex items-center text-sm sm:text-base text-neutral-800">
                <p>Подробнее</p>
                <svg class="rtl:rotate-180 w-3 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
              </NuxtLink>
              <div class="mt-2 sm:mt-4 flex items-center justify-between">
                <span class="text-xs sm:text-sm text-neutral-800">{{ formatDate(work.publishedAt) }}</span>
                <div class="flex space-x-2"></div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- блок с прайс-листом -->
    <h1 class="text-3xl font-bold sm:text-4xl text-center p-6 dark:text-white">Услуги и Цены</h1>
    <section class="flex flex-col md:flex-row justify-between mx-auto w-full max-w-screen-xl lg:py-8 dark:text-white gap-6 px-4">
      <!-- карточка 1 -->
      <div
        class="w-full md:w-1/3 p-4 bg-white border border-rose-500 rounded-lg sm:p-8 shadow-lg dark:bg-neutral-600 dark:border-neutral-600">
        <h5 class="mb-4 text-3xl font-medium h-20">Планировочное решение</h5>
        <div class="flex items-baseline dark:text-white">
          <span class="text-5xl font-bold tracking-tight">950 <span class="text-3xl font-semibold">₽/м²</span></span>
        </div>
        <ul role="list" class="space-y-5 my-7 h-75">
          <li class="flex items-center">
            <svg class="shrink-0 w-4 h-4 text-rose-500 dark:text-rose-500" aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span class="text-base font-normal leading-tight text-neutral-600 dark:text-neutral-400 ms-3">все размеры
              мебели</span>
          </li>
          <li class="flex">
            <svg class="shrink-0 w-4 h-4 text-rose-500 dark:text-rose-500" aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span class="text-base font-normal leading-tight text-neutral-600 dark:text-neutral-400 ms-3">размеры
              оборудования</span>
          </li>
          <li class="flex">
            <svg class="shrink-0 w-4 h-4 text-rose-500 dark:text-rose-500" aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span class="text-base font-normal leading-tight text-neutral-600 dark:text-neutral-400 ms-3">экспликация
              помещения</span>
          </li>
          <li class="flex items-center">
            <svg class="shrink-0 w-4 h-4 text-rose-500 dark:text-rose-500" aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span class="text-base font-normal leading-tight text-neutral-600 dark:text-neutral-400 ms-3">расстояние у
              проходов</span>
          </li>
          <li class="flex">
            <svg class="shrink-0 w-4 h-4 text-rose-500 dark:text-rose-500" aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span class="text-base font-normal leading-tight text-neutral-600 dark:text-neutral-400 ms-3">обозначение
              мелких предметов</span>
          </li>
          <li class="flex">
            <svg class="shrink-0 w-4 h-4 text-rose-500 dark:text-rose-500" aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span class="text-base font-normal leading-tight text-neutral-600 dark:text-neutral-400 ms-3">направление
              открывания дверей</span>
          </li>
        </ul>
        <button type="button"
          class="border-1 border-rose-500 dark:border-white dark:text-white hover:bg-rose-400 hover:text-white transition-colors shadow-md font-medium rounded-lg text-sm px-5 py-3 inline-flex justify-center w-full text-center">Получить
          консультацию</button>
      </div>
      <!-- карточка 2 -->
      <div
        class="w-full md:w-1/3 p-4 bg-white border border-rose-500 rounded-lg sm:p-8 shadow-lg dark:bg-neutral-600 dark:border-neutral-600">
        <h5 class="mb-4 text-3xl font-medium h-20">Полный дизайн-проект</h5>
        <div class="flex items-baseline dark:text-white">
          <span class="text-5xl font-bold tracking-tight">3000 <span class="text-3xl font-semibold">₽/м²</span></span>
        </div>
        <ul role="list" class="space-y-5 my-7 h-75">
          <li class="flex items-center">
            <svg class="shrink-0 w-4 h-4 text-rose-500 dark:text-rose-500" aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span class="text-base font-normal leading-tight text-neutral-600 dark:text-neutral-400 ms-3">планировочное
              решение (2-3 варианта на выбор)</span>
          </li>
          <li class="flex">
            <svg class="shrink-0 w-4 h-4 text-rose-500 dark:text-rose-500" aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span
              class="text-base font-normal leading-tight text-neutral-600 dark:text-neutral-400 ms-3">3D-визуализация</span>
          </li>
          <li class="flex">
            <svg class="shrink-0 w-4 h-4 text-rose-500 dark:text-rose-500" aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span class="text-base font-normal leading-tight text-neutral-600 dark:text-neutral-400 ms-3">чертежная
              документация (полный комплект)</span>
          </li>
          <li class="flex items-center">
            <svg class="shrink-0 w-4 h-4 text-rose-500 dark:text-rose-500" aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span class="text-base font-normal leading-tight text-neutral-600 dark:text-neutral-400 ms-3">ведомость всех
              материалов</span>
          </li>
          <li class="flex">
            <svg class="shrink-0 w-4 h-4 text-rose-500 dark:text-rose-500" aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span class="text-base font-normal leading-tight text-neutral-600 dark:text-neutral-400 ms-3">ведомость
              мебели, оборудования и освещения</span>
          </li>
          <li class="flex">
            <svg class="shrink-0 w-4 h-4 text-rose-500 dark:text-rose-500" aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span class="text-base font-normal leading-tight text-neutral-600 dark:text-neutral-400 ms-3">габаритные
              чертежи заказных изделийй</span>
          </li>
        </ul>
        <button type="button"
          class="border-1 border-rose-500 dark:border-white dark:text-white hover:bg-rose-400 hover:text-white transition-colors shadow-md font-medium rounded-lg text-sm px-5 py-3 inline-flex justify-center w-full text-center">Получить
          консультацию</button>
      </div>
      <!-- карточка 3 -->
      <div
        class="w-full md:w-1/3 p-4 bg-white border border-rose-500 rounded-lg sm:p-8 shadow-lg dark:bg-neutral-600 dark:border-neutral-600">
        <h5 class="mb-4 text-3xl font-medium h-20">Авторский надзор</h5>
        <div class="flex items-baseline dark:text-white">
          <span class="text-5xl font-bold tracking-tight">30000 <span class="text-3xl font-semibold">/в
              месяц</span></span>
        </div>
        <ul role="list" class="space-y-5 my-7 h-75">
          <li class="flex items-center">
            <svg class="shrink-0 w-4 h-4 text-rose-500 dark:text-rose-500" aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span class="text-base font-normal leading-tight text-neutral-600 dark:text-neutral-400 ms-3">посещение
              объекта во время всех ключевых этапов ремонта</span>
          </li>
          <li class="flex">
            <svg class="shrink-0 w-4 h-4 text-rose-500 dark:text-rose-500" aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span class="text-base font-normal leading-tight text-neutral-600 dark:text-neutral-400 ms-3">помощь в
              подборке материалов</span>
          </li>
          <li class="flex">
            <svg class="shrink-0 w-4 h-4 text-rose-500 dark:text-rose-500" aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span class="text-base font-normal leading-tight text-neutral-600 dark:text-neutral-400 ms-3">отслеживание
              текущих работ на объекте</span>
          </li>
          <li class="flex items-center">
            <svg class="shrink-0 w-4 h-4 text-rose-500 dark:text-rose-500" aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span class="text-base font-normal leading-tight text-neutral-600 dark:text-neutral-400 ms-3">своевременная
              корректировка и дополнения чертежей в случае непредвиденных ситуаций</span>
          </li>
          <li class="flex">
            <svg class="shrink-0 w-4 h-4 text-rose-500 dark:text-rose-500" aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span class="text-base font-normal leading-tight text-neutral-600 dark:text-neutral-400 ms-3">корректировка
              чертежей после возведения и оштукатуривания стен</span>
          </li>
        </ul>
        <button type="button"
          class="border-1 border-rose-500 dark:border-white dark:text-white hover:bg-rose-400 hover:text-white transition-colors shadow-md font-medium rounded-lg text-sm px-5 py-3 inline-flex justify-center w-full text-center">Получить
          консультацию</button>
      </div>
    </section>

    <!-- Рекламный блок (новый) -->
    <section class="mx-auto w-full max-w-screen-xl px-4 lg:py-8 dark:text-white">
      <div class="container mx-auto p-6 sm:py-8 bg-neutral-200 rounded-lg dark:bg-neutral-600">
        <div class="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
          <div class="w-full md:w-2/3">
            <h2 class="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-3">Дизайн - это не просто красивые картинки.</h2>
            <p class="text-base sm:text-xl text-neutral-600 dark:text-neutral-400 mb-4">Предоставляем полный спектр услуг по созданию вашего идеального пространства</p>
            <div class="space-y-3">
              <div class="flex items-center gap-3 text-neutral-600 dark:text-neutral-400">
                <svg class="w-4 h-4 sm:w-5 sm:h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                <span class="text-sm sm:text-base">Дизайн-проект</span>
              </div>
              <div class="flex items-center gap-3 text-neutral-600 dark:text-neutral-400">
                <svg class="w-4 h-4 sm:w-5 sm:h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                <span class="text-sm sm:text-base">Авторский надзор</span>
              </div>
              <div class="flex items-center gap-3 text-neutral-600 dark:text-neutral-400">
                <svg class="w-4 h-4 sm:w-5 sm:h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                <span class="text-sm sm:text-base">Подготовка документации</span>
              </div>
            </div>
          </div>
          <div class="w-full md:w-1/3 flex justify-end mt-6 md:mt-0">
            <NuxtLink to="/contact"
              class="w-full sm:w-auto border-2 border-white bg-rose-500 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium hover:bg-rose-500/10 hover:border-rose-500 hover:text-rose-500 transition-colors shadow-md text-sm sm:text-base">
              Заказать дизайн-проект
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- блок с вакансией -->
    <div class="relative isolate overflow-hidden dark:bg-neutral-700 py-24 sm:py-32">
      <!-- фон градиента -->
      <div class="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
        aria-hidden="true">
        <div class="aspect-1097/845 w-[68.5625rem] bg-linear-to-tr from-[#ff4b78] to-[#ff2056] opacity-40"
          style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)">
        </div>
      </div>
      <div
        class="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
        aria-hidden="true">
        <div class="aspect-1097/845 w-[68.5625rem] bg-linear-to-tr from-[#ff4b78] to-[#ff2056] opacity-40"
          style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)">
        </div>
      </div>
      <!-- текст и описание -->
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl lg:mx-0">
          <h2 class="text-5xl font-semibold tracking-tight dark:text-white sm:text-7xl">Работа с нами</h2>
          <p class="mt-8 text-lg font-medium text-pretty dark:text-gray-300 sm:text-xl/8">Мы — команда увлеченных
            дизайнеров, архитекторов и энтузиастов, которые стремятся вдохновить вас на создание красивых и
            функциональных пространств. Наша цель — делиться знаниями, идеями и последними трендами в мире дизайна
            интерьера, чтобы помочь вам превратить ваш дом в уютное и стильное место.</p>
        </div>
        <div class="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
          <div
            class="grid grid-cols-1 gap-x-8 gap-y-6 text-base/7 font-semibold dark:text-white sm:grid-cols-2 md:flex lg:gap-x-10">
            <NuxtLink to="/contact">Открытые вакансии <span aria-hidden="true">&rarr;</span></NuxtLink>
            <NuxtLink to="/contact">Программа стажировок <span aria-hidden="true">&rarr;</span></NuxtLink>
            <NuxtLink to="/contact">Познакомьтесь с нашим руководством <span aria-hidden="true">&rarr;</span></NuxtLink>
          </div>
          <dl class="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
            <div class="flex flex-col-reverse gap-1">
              <dt class="text-base/7 dark:text-gray-300">Офисы по региону</dt>
              <dd class="text-4xl font-semibold tracking-tight dark:text-white">8</dd>
            </div>
            <div class="flex flex-col-reverse gap-1">
              <dt class="text-base/7 dark:text-gray-300">Количество сотрудников</dt>
              <dd class="text-4xl font-semibold tracking-tight dark:text-white">100+</dd>
            </div>
            <div class="flex flex-col-reverse gap-1">
              <dt class="text-base/7 dark:text-gray-300">Часов в неделю</dt>
              <dd class="text-4xl font-semibold tracking-tight dark:text-white">40</dd>
            </div>
            <div class="flex flex-col-reverse gap-1">
              <dt class="text-base/7 dark:text-gray-300">Оплачиваемый отпуск</dt>
              <dd class="text-4xl font-semibold tracking-tight dark:text-white">2 раза в год</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Index from './portfolio/index.vue';
const email = ref('')
const works = ref([])

// Убираем демо-данные и инициализируем пустой массив
const latestPosts = ref([])
const isLoading = ref(false)

// Функция для получения списка работ
async function fetchWorks() {
    try {
        isLoading.value = true;
        const response = await fetch('https://55ab4659a877.vps.myjino.ru/x/api/works?populate=*');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const res = await response.json();
        works.value = res.data;
    } catch (error) {
        console.error('Ошибка при получении работ:', error);
    } finally {
        isLoading.value = false;
    }
}

const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const months = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

onMounted(() => {
    fetchWorks();
});

const fetchSubscribs = async () => {
  try {
    const response = await $fetch('https://55ab4659a877.vps.myjino.ru/x/api/subscribers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: {
        data: {
          email: email.value
        }
      }
    })

    if (response.ok) {
      console.log(response);
    }
  } catch (error) {
    token = "7909774177:AAF7mXxvMhyq_074SRJnE9byfomncgDL5a8";
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(`Не получилось сохранить E-mailL: ${error}`),
    });
  }
}
</script>