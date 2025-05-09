<template>
  <div>
    <!-- первый блок -->
    <div class="relative isolate overflow-hidden dark:bg-neutral-700 py-24 sm:py-32">
      <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply" alt="" class="absolute inset-0 brightness-90 opacity-60 -z-10 size-full object-cover object-right md:object-center">
      <div class="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl" aria-hidden="true">
        <div class="aspect-1097/845 w-[68.5625rem] bg-linear-to-tr from-[#ff4b78] to-[#ff2056] opacity-40" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div>
      </div>
      <div class="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu" aria-hidden="true">
        <div class="aspect-1097/845 w-[68.5625rem] bg-linear-to-tr from-[#ff4b78] to-[#ff2056] opacity-40" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div>
      </div>
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl lg:mx-0">
          <h2 class="text-5xl font-semibold tracking-tight text-white sm:text-7xl">Работа с нами</h2>
          <p class="mt-8 text-lg font-medium text-pretty text-gray-300 sm:text-xl/8">Мы — команда увлеченных дизайнеров, архитекторов и энтузиастов, которые стремятся вдохновить вас на создание красивых и функциональных пространств. Наша цель — делиться знаниями, идеями и последними трендами в мире дизайна интерьера, чтобы помочь вам превратить ваш дом в уютное и стильное место.</p>
        </div>
        <div class="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
          <div class="grid grid-cols-1 gap-x-8 gap-y-6 text-base/7 font-semibold text-white sm:grid-cols-2 md:flex lg:gap-x-10">
            <NuxtLink to="/contact">Открытые вакансии <span aria-hidden="true">&rarr;</span></NuxtLink>
            <NuxtLink to="/contact">Программа стажировок <span aria-hidden="true">&rarr;</span></NuxtLink>
            <NuxtLink to="/contact">Познакомьтесь с нашим руководством <span aria-hidden="true">&rarr;</span></NuxtLink>
          </div>
          <dl class="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
            <div class="flex flex-col-reverse gap-1">
              <dt class="text-base/7 text-gray-300">Офисы по региону</dt>
              <dd class="text-4xl font-semibold tracking-tight text-white">8</dd>
            </div>
            <div class="flex flex-col-reverse gap-1">
              <dt class="text-base/7 text-gray-300">Количество сотрудников</dt>
              <dd class="text-4xl font-semibold tracking-tight text-white">100+</dd>
            </div>
            <div class="flex flex-col-reverse gap-1">
              <dt class="text-base/7 text-gray-300">Часов в неделю</dt>
              <dd class="text-4xl font-semibold tracking-tight text-white">40</dd>
            </div>
            <div class="flex flex-col-reverse gap-1">
              <dt class="text-base/7 text-gray-300">Оплачиваемый отпуск</dt>
              <dd class="text-4xl font-semibold tracking-tight text-white">2 раза в год</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
    <!-- блок с подпиской -->
    <div class="relative isolate overflow-hidden dark:bg-neutral-700 py-16 sm:py-24 lg:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
          <div class="max-w-xl lg:max-w-lg">
            <h2 class="text-4xl font-semibold tracking-tight text-white">Подпишитесь на наши новости</h2>
            <p class="mt-4 text-lg text-gray-300">Получайте уведомления о новых статьях и обновлениях.</p>
            <div class="mt-6 flex max-w-md gap-x-4">
              <label for="email-address" class="sr-only">Email address</label>
              <input v-model="email" id="email-address" name="email" type="email" autocomplete="email" required class="min-w-0 flex-auto rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-rose-500 sm:text-sm/6" placeholder="Введите свой email">
              <button @click="fetchSubscribs" type="submit" class="flex-none rounded-md bg-rose-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-rose-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500">Отправить</button>
            </div>
          </div>
          <dl class="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
            <div class="flex flex-col items-start">
              <div class="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                <svg class="size-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                </svg>
              </div>
              <dt class="mt-4 text-base font-semibold text-white">Актуальные статьи</dt>
              <dd class="mt-2 text-base/7 text-gray-400">Успей прочитать новые статьи о дизайне от разных специалистов.</dd>
            </div>
            <div class="flex flex-col items-start">
              <div class="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                <svg class="size-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M10.05 4.575a1.575 1.575 0 1 0-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 0 1 3.15 0v1.5m-3.15 0 .075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 0 1 3.15 0V15M6.9 7.575a1.575 1.575 0 1 0-3.15 0v8.175a6.75 6.75 0 0 0 6.75 6.75h2.018a5.25 5.25 0 0 0 3.712-1.538l1.732-1.732a5.25 5.25 0 0 0 1.538-3.712l.003-2.024a.668.668 0 0 1 .198-.471 1.575 1.575 0 1 0-2.228-2.228 3.818 3.818 0 0 0-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0 1 16.35 15m.002 0h-.002" />
                </svg>
              </div>
              <dt class="mt-4 text-base font-semibold text-white">Без спама</dt>
              <dd class="mt-2 text-base/7 text-gray-400">Мы делаем рассылку только о новых статья и обновлениях, чтобы вы всегда мы в курсе актуальных тем.</dd>
            </div>
          </dl>
        </div>
      </div>
      <div class="absolute top-0 left-1/2 -z-10 -translate-x-1/2 blur-3xl xl:-top-6" aria-hidden="true">
        <div class="aspect-1155/678 w-[72.1875rem] bg-linear-to-tr from-[#ff4b78] to-[#ff2056] opacity-30" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div>
      </div>
    </div>

  </div>
</template>

<script setup>
const email = ref('')

const fetchSubscribs = async () => {
  try {
    const response = await $fetch('https://55ab4659a877.vps.myjino.ru/x/api/subscribers', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: {
        data: {
          email: email.value
        }
      }
    })

    if(response.ok) {
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