<template>
    <h1 class="text-rose-500 text-center text-4xl font-bold p-4">О нас</h1>
    <div class="flex flex-row flex-wrap justify-center gap-3 py-4 text-black">
        <div class="flex flex-col gap-3 p-6 max-w-2xl text-wrap bg-rose-50/50 border border-rose-500 rounded-2xl shadow-xl">
            <h3 class="text-black text-center text-xl font-bold">Добро пожаловать на наш блог о дизайне интерьера!</h3>
            <p>
                Мы — команда увлеченных дизайнеров, архитекторов и энтузиастов, которые стремятся вдохновить вас на создание красивых и функциональных пространств. Наша цель — делиться знаниями, идеями и последними трендами в мире дизайна интерьера, чтобы помочь вам превратить ваш дом в уютное и стильное место.
            </p>
        </div>
        <div class="flex flex-col gap-3 p-6 max-w-2xl text-wrap bg-rose-50/50 border border-rose-500 rounded-2xl shadow-xl">
            <h4 class="text-rose-500 text-center text-xl font-bold">Наша История</h4>
            <p>
                Наш блог был основан в 2023 году, когда мы решили объединить наши страсти к дизайну и архитектуре. С тех пор мы исследуем различные стили, материалы и техники, чтобы предоставить вам актуальную информацию и вдохновение для вашего собственного пространства. Мы верим, что каждый дом — это отражение его владельца, и мы здесь, чтобы помочь вам выразить свою индивидуальность через дизайн.
            </p>   
        </div>
        <div class="flex flex-col gap-3 p-6 max-w-2xl text-wrap bg-rose-50/50 border border-rose-500 rounded-2xl shadow-xl">
            <h4 class="text-rose-500 text-center text-xl font-bold">Что Мы Предлагаем</h4>
            <p>На нашем блоге вы найдете:</p>
            <ul class="text-black text-left p-4 list-disc">
                <li>
                    Идеи и вдохновение: Статьи о последних трендах в дизайне интерьера, советы по выбору цветовых палитр, мебели и декора.
                </li>
                <li>
                    Руководства и советы: Практические рекомендации по планированию пространства, организации хранения и созданию уютной атмосферы.</li>
                <li>
                    Обзоры продуктов: Рекомендации по выбору мебели, освещения и аксессуаров, которые помогут вам создать идеальный интерьер.
                </li>
                <li>
                    Истории успеха: Примеры успешных проектов и преобразований, которые вдохновят вас на изменения в вашем собственном доме.
                </li>
            </ul>
        </div>
        <div class="flex flex-col gap-3 p-6 max-w-2xl text-wrap bg-rose-50/50 border border-rose-500 rounded-2xl shadow-xl">
            <h4 class="text-rose-500 text-center text-xl font-bold">Наша Миссия</h4>
            <p>
                Мы верим, что дизайн интерьера — это не только эстетика, но и функциональность. Наша миссия — помочь вам создать пространство, которое будет не только красивым, но и удобным для жизни. Мы стремимся сделать дизайн доступным для всех, независимо от бюджета и стиля.
            </p>
            <p>
                Присоединяйтесь к Нам!
                Мы приглашаем вас стать частью нашего сообщества! Подписывайтесь на наш блог, чтобы не пропустить новые статьи, советы и вдохновение для вашего интерьера. Делитесь своими идеями и задавайте вопросы — мы всегда рады общению с нашими читателями!
            </p>
            <p>
                Спасибо, что вы с нами! Давайте вместе создавать красивые и уютные пространства!
            </p>
        </div>
    </div>
</template>

<script setup>
// получаем мета данные
const index = useIndexStore();
const seo = ref({})

const { data } = await useAsyncData('seo', ()  =>
  $fetch(`http://localhost:1338/api/about?populate=*`),
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
</script>