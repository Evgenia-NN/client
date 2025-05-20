<template>
    <div v-bind="$attrs">
    <nav class="flex" aria-label="Хлебные крошки">
        <ol class="flex flex-wrap items-center space-x">
            <li>
                <NuxtLink to="/blog" class="text-neutral-600 hover:text-rose-500 dark:text-neutral-400 dark:hover:text-rose-500">
                    <svg class="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12.5812 2.68627C12.2335 2.43791 11.7664 2.43791 11.4187 2.68627L1.9187 9.47198L3.08118 11.0994L11.9999 4.7289L20.9187 11.0994L22.0812 9.47198L12.5812 2.68627ZM19.5812 12.6863L12.5812 7.68627C12.2335 7.43791 11.7664 7.43791 11.4187 7.68627L4.4187 12.6863C4.15591 12.874 3.99994 13.177 3.99994 13.5V20C3.99994 20.5523 4.44765 21 4.99994 21H18.9999C19.5522 21 19.9999 20.5523 19.9999 20V13.5C19.9999 13.177 19.844 12.874 19.5812 12.6863ZM5.99994 19V14.0146L11.9999 9.7289L17.9999 14.0146V19H5.99994Z"></path></svg>
                </NuxtLink>
            </li>
            <li v-for="(item, index) in items" :key="index" class="flex items-center">
                <svg class="w-4 h-4 mx-2 text-neutral-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
                <NuxtLink 
                    v-if="item.to && index !== items.length - 1" 
                    :to="'/'+item.to"
                    class="text-neutral-600 hover:text-rose-500 dark:text-neutral-400 dark:hover:text-rose-500"
                >
                    {{ item.text }}
                </NuxtLink>
                <span 
                    v-else 
                    class="text-neutral-600 dark:text-neutral-400"
                >
                    {{ item.text }}
                </span>
            </li>
        </ol>
    </nav>
    </div>
</template>

<script setup>
defineProps({
    items: {
        type: Array,
        required: true,
        default: () => []
    }
});

// Включаем наследование атрибутов
defineOptions({
    inheritAttrs: false
});
</script>