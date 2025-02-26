<template>
  <!--  -->
    <form @submit.prevent="submitForm" class="max-w-sm mx-13 p-4 md:py-8">
        <h3 class="text-white font-bold py-3">Форма обратной связи:</h3>
        <div class="relative z-0 w-full mb-5 group">
            <input v-model="formName" type="text" name="name" id="name" class="text-white block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-1 border-white opacity-40 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-white peer" placeholder=" " required />
            <label for="text" class="text-white opacity-40 peer-focus:font-medium absolute text-sm text-gr dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Ваше имя</label>
        </div>
        <div class="relative z-0 w-full mb-5 group">
            <input  v-model="formEmail" type="email" name="email" id="email" class="text-white block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-1 border-white opacity-40 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-white peer" placeholder=" " required />
            <label for="email" class="text-white opacity-40 peer-focus:font-medium absolute text-sm dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Ваш адрес эл.почты</label>
        </div>
        <div>
            <label for="message" class="text-white block mb-2 text-sm font-medium dark:text-white">Ваше сообщение</label>
            <textarea  v-model="formMessage" id="message" rows="4" class="text-white opacity-40 block p-2.5 w-full text-sm rounded-lg border border-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-white dark:focus:border-white" placeholder="Оставьте сообщение..."></textarea>
        </div>
        <button type="submit" class="text-white border-white border-1 shadow-xl hover:border-neutral-700 hover:text-neutral-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 my-5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Отправить</button>
    </form>
</template>

<script setup>
const token = "7909774177:AAF7mXxvMhyq_074SRJnE9byfomncgDL5a8";
const chatId = "-1002407111440";

const formName = ref('');
const formEmail = ref('');
const formMessage = ref('');

const sendMessage = async (message) => {
  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: 'HTML'
    }),
    headers: { 'Content-Type': 'application/json' },
  });
  return response.json();
};

const submitForm = async () => {
  const message = `
    <b>Новое сообщение от пользователя:</b>
    <b>Имя:</b> ${formName.value}
    <b>Email:</b> ${formEmail.value}
    <b>Сообщение:</b> ${formMessage.value}
  `;
  try {
    const response = await sendMessage(message);
    if (response.ok) {
      alert('Ваше сообщение успешно отправлено!');
      formName.value = '';
      formEmail.value = '';
      formMessage.value = '';
    } else {
      alert('Ошибка при отправке сообщения. Пожалуйста, попробуйте еще раз.');
    }
  } catch (error) {
    alert('Ошибка при отправке сообщения. Пожалуйста, попробуйте еще раз.');
    console.error(error);
  }
};
</script>
