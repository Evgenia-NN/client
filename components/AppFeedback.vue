<template>
  <!--  -->
    <form @submit.prevent="submitForm" class="max-w-sm mx-13 p-4 md:py-8">
        <h3 class="font-bold py-3 dark:text-white">Форма обратной связи:</h3>
        <div class="relative z-0 w-full mb-5 group">
            <input v-model="formName" type="text" name="name" id="name" class="text-white block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-1 border-white opacity-40 appearance-none dark:text-white dark:border-neutral-500 dark:focus:border-rose-500 focus:outline-none focus:ring-0 focus:border-white peer" placeholder=" " required />
            <label for="text" class="opacity-60 peer-focus:font-medium absolute text-sm text-gr dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Ваше имя</label>
        </div>
        <div class="relative z-0 w-full mb-5 group">
            <input  v-model="formEmail" type="email" name="email" id="email" class="text-white block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-1 border-white opacity-40 appearance-none dark:text-white dark:border-neutral-500 dark:focus:border-rose-500 focus:outline-none focus:ring-0 focus:border-white peer" placeholder=" " required />
            <label for="email" class="opacity-60 peer-focus:font-medium absolute text-sm dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Ваш адрес эл.почты</label>
        </div>
        <div>
            <label for="message" class="block mb-2 text-sm font-medium dark:text-white">Ваше сообщение</label>
            <textarea  v-model="formMessage" id="message" rows="4" class="opacity-60 block p-2.5 w-full text-sm rounded-lg border border-white focus:ring-rose-500 focus:border-rose-500 dark:bg-neutral-700 dark:border-neutral-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-white dark:focus:border-white" placeholder="Оставьте сообщение..."></textarea>
        </div>
        <button type="submit" class="border-white border-1 shadow-xl dark:text-white hover:border-rose-500 hover:text-black focus:ring-4 focus:outline-none focus:ring-rose-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 my-5 text-center dark:hover:bg-rose-500 dark:focus:ring-rose-500">Отправить</button>
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
