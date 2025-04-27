<template>
    <footer class="rounded-lg dark:bg-neutral-700 m-4">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-6">
            <!-- логотип -->
            <NuxtLink to="/" class="flex items-center space-x-2 rtl:space-x-reverse">
                <img src="file:///C:/Users/Ivan/Downloads/Лого%20розовый.svg" class="h-7" alt="EvgeniaDesign Logo" />
                <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">EvgeniaDesign</span>
            </NuxtLink>
            
            <!-- Мобильное меню -->
            <ul :class="[
                'flex flex-col lg:hidden w-full p-4 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700',
                menuOpen ? 'block' : 'hidden']">
                <li v-for="nav in navbar" :key="nav.sort" :class="`order-${nav.sort}`" class="relative w-full">
                    <div class="p-1 flex items-center justify-between w-full hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded-lg transition-colors duration-200">
                        <NuxtLink :to="nav.to" class="flex-1 py-3 px-4 text-gray-900 rounded dark:text-white dark:hover:bg-transparent dark:border-gray-700"
                            :class="{ 'text-cyan-700 dark:text-cyan-500': route.path == nav.path }" @click="handleLinkClick">
                            <span class="text-base">{{ nav.name }}</span>
                        </NuxtLink>
                        <button v-if="Array.isArray(nav.categories) && nav.categories.length > 0" @click.stop="toggleCategory(nav)"
                            class="p-2 rounded-lg bg-gray-200 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors duration-200">
                            <svg class="w-4 h-4 transition-transform duration-200 text-gray-600 dark:text-gray-300" 
                                :class="{ 'rotate-180': isCategoryOpen(nav) }" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/></svg>
                        </button>
                    </div>
                </li>
            </ul>
                        
            <!-- Десктопное меню -->
            <ul class="hidden lg:flex lg:items-center lg:space-x-8 rtl:space-x-reverse">
                <li v-for="nav in navbar" :key="nav.sort" class="relative group">
                    <div class="flex items-center gap-1">
                        <NuxtLink :to="nav.to"
                            active-class="active-link" class="hover:underline hover:text-rose-500 block py-2 px-3 md:p-0 rounded-sm md:bg-transparent dark:text-white"
                            :class="{ 'text-cyan-700 dark:text-cyan-500': route.path == nav.path }"
                            @click="handleLinkClick">
                            <span class="text-base">{{ nav.name }}</span>
                        </NuxtLink>
                        <div v-if="Array.isArray(nav.categories) && nav.categories.length > 0" 
                            class="flex items-center justify-center w-4 h-4 transition-all duration-300 group-hover:rotate-180">
                            <svg class="w-3 h-3 text-gray-500 dark:text-gray-400 group-hover:text-cyan-700 dark:group-hover:text-cyan-500" 
                                aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                            </svg>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="max-w-screen-xl mx-auto p-6">
            <hr class="my-6 border-gray-700 sm:mx-auto dark:border-gray-200 lg:my-8"/>
            <span class="block text-sm sm:text-center dark:text-gray-400">© 2025 <a href="https://flowbite.com/" class="hover:underline">Company™</a>. Все права защищены.</span>
        </div>
    </footer>
</template>

<script setup>
    const route = useRoute()
    const menuOpen = defineModel()
    const navbar = ref()
    const index = useIndexStore()
    
    const isNearRightEdge = ref(false)
    const isNearBottomEdge = ref(false)
    const openCategories = ref(new Set())
    const openSubcategories = ref(new Set())
    const activeCategory = ref(null)
    
    const isCategoryOpen = (nav) => openCategories.value.has(nav.id)
    const isSubcategoryOpen = (category) => openSubcategories.value.has(category.id)
    
    const handleLinkClick = () => {
        closeAllMenus()
        menuOpen.value = false
    }
    
    const toggleCategory = (nav) => {
        if (openCategories.value.has(nav.id)) {
            openCategories.value.delete(nav.id)
            activeCategory.value = null
        } else {
            openCategories.value.clear()
            openCategories.value.add(nav.id)
            activeCategory.value = nav.id
        }
    }
    
    const toggleSubcategory = (category) => {
        if (openSubcategories.value.has(category.id)) {
            openSubcategories.value.delete(category.id)
        } else {
            openSubcategories.value.clear()
            openSubcategories.value.add(category.id)
        }
    }
    
    const closeAllMenus = () => {
        openCategories.value.clear()
        openSubcategories.value.clear()
        activeCategory.value = null
    }
    
    const checkPosition = (element) => {
        if (!element) return
        const rect = element.getBoundingClientRect()
        const windowWidth = window.innerWidth
        const windowHeight = window.innerHeight
        
        // Проверяем, не выходит ли меню за правый край экрана
        isNearRightEdge.value = rect.right + 400 > windowWidth
        
        // Проверяем, не выходит ли меню за нижний край экрана
        isNearBottomEdge.value = rect.bottom + 300 > windowHeight
    }
    
    const handleClickOutside = (event) => {
        const menu = document.querySelector('.main-menu')
        const dropdowns = document.querySelectorAll('.dropdown-menu')
        const submenus = document.querySelectorAll('.submenu')
        const categoryButtons = document.querySelectorAll('.category-button')
        const subcategoryButtons = document.querySelectorAll('.subcategory-button')
        
        const isClickInside = 
            menu?.contains(event.target) || 
            Array.from(dropdowns).some(dropdown => dropdown.contains(event.target)) ||
            Array.from(submenus).some(submenu => submenu.contains(event.target)) ||
            Array.from(categoryButtons).some(button => button.contains(event.target)) ||
            Array.from(subcategoryButtons).some(button => button.contains(event.target))
        
        if (!isClickInside) {
            closeAllMenus()
        }
    }
    
    const fetchNavbar = async () => {
        try {
            index.loader = true
            const res = await $fetch('http://localhost:1338/api/footers?[categories][populate]=subcategories&sort=sort:asc')
            navbar.value = res.data
        } catch (error) {
            console.log(error)
        } finally {
            index.loader = false
        }
    }
    
    onMounted(() => {
        fetchNavbar()
        window.addEventListener('resize', () => {
            const elements = document.querySelectorAll('.group/sub')
            elements.forEach(element => checkPosition(element))
        })
        document.addEventListener('click', handleClickOutside)
    })
    
    onUnmounted(() => {
        document.removeEventListener('click', handleClickOutside)
    })
    </script>

<style>
.active-link {
  color: oklch(0.645 0.246 16.439);
}
</style>