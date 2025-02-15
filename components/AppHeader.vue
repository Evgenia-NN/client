<template>
    <header class="flex justify-between p-4 m-0 bg-[#bdc574]">
        <!-- <p class="flex font-bold">Logo</p> -->
        <img class="flex font-bold w-10 h-10" src="https://cdn1.iconfinder.com/data/icons/arrows-elements-outline/128/ic_round_logo-1024.png" alt="Logo">
        <ul class=" flex gap-4 items-center">
            <li><NuxtLink to="/" active-class="active-link">Главная</NuxtLink></li>
            <li><NuxtLink to="/about" active-class="active-link">О нас</NuxtLink></li>
            <li><NuxtLink to="/contact" active-class="active-link">Контакты</NuxtLink></li>
        </ul>
        <p> </p>
    </header>
</template>

<style>
.active-link {
  color: blue;
}
</style>
