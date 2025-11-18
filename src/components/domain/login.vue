<template>
  <div class="h-screen flex justify-center items-center bg-gray-100">
    <div class="w-[500px] bg-white p-6 rounded-lg shadow-lg flex flex-col gap-6">
      <h2 class="text-2xl font-semibold text-center text-gray-800">Авторизация</h2>
      <Input v-model="form.email" id="email" label="Почта" placeholder="Введите почту" />
      <Button full @click="login"> Войти </Button>
    </div>
  </div>
</template>
<script setup lang="ts">
import Input from '../ui/inputs/default.vue'
import Button from '../ui/buttons/default.vue'
import { reactive } from 'vue'
defineOptions({
  name: 'LoginComponent'
})
const form = reactive({
  email: '',
  password: ''
})

const login = () => {
  console.log('123');
}
</script>