<template>
    <h1 class="text-rose-500 text-center text-2xl font-bold p-4">Блог</h1>
</template>

<script setup>
// Функция для получения списка всех статей
async function fetchArticles() {
    try {
        const response = await fetch('http://localhost:1338/api/articles/');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const articles = await response.json();
        console.log('Список всех статей:', articles);
    } catch (error) {
        console.error('Ошибка при получении статей:', error);
    }
}

// Функция для получения статьи по ID
async function fetchArticleById(id) {
    try {
        const response = await fetch(`http://localhost:1338/api/articles/`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const article = await response.json();
        console.log(`Статья с ID ${id}:`, article);
    } catch (error) {
        console.error(`Ошибка при получении статьи с ID ${id}:`, error);
    }
}

fetchArticles();

// Пример вызова для получения статьи по ID (замените 1 на нужный ID)
fetchArticleById(1);


// Функция для обновления заголовка статьи
async function updateArticleTitle(id, newTitle) {
    const updatedData = {
        title: newTitle
    };

    try {
        const response = await fetch(`http://localhost:1338/api/articles/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        });

        if (!response.ok) {
            throw new Error('Ошибка сети: ' + response.statusText);
        }

        const updatedArticle = await response.json();
        console.log(`Статья с ID ${id} обновлена:`, updatedArticle);
    } catch (error) {
        console.error('Ошибка при обновлении заголовка статьи:', error);
    }
}

// Пример вызова функции для обновления заголовка статьи с ID 1
updateArticleTitle(1, 'Новый заголовок статьи');
</script>