<template>
  <div class="h-screen flex justify-center items-center bg-gray-100">
    <div class="w-[500px] bg-white p-6 rounded-lg shadow-lg flex flex-col gap-6">
      <h2 class="text-2xl font-semibold text-center text-gray-800">Авторизация</h2>
      <Input v-model="form.email" id="email" label="Почта" placeholder="Введите почту" 
      :error="errors.email ? true : false" :error-msg="errors.email"/>
      <Password v-model="form.password" id="password" label="Пароль" placeholder="Введите пароль"
      :error="errors.password ? true : false" :error-msg="errors.password"></Password>
      <Button full @click="login" :disabled="disabledLogin"> Войти </Button>
      <p class="text-center">
        Нету аккаунта ?
        <RouterLink to="/auth/register" class="link">
          Зарегистрируйтесь
        </RouterLink>
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
import Input from '@/components/ui/inputs/default.vue'
import Password from '@/components/ui/inputs/password.vue'
import Button from '@/components/ui/buttons/default.vue'
import { ref, reactive, watch } from 'vue'
import { useAlertStore } from '@/stores/alert'
import { loginSchema } from '@/interfaces/auth.interface'
import type { loginInterface } from '@/interfaces/auth.interface'
import { validateForm } from '@/utils/validateForm'
import { authService } from '@/services/auth.service'
import { useRouter } from 'vue-router'
defineOptions({
  name: 'LoginComponent'
})
const Alert = useAlertStore()
const router = useRouter()
const disabledLogin = ref<boolean>(false)
const errors = reactive<Record<string, any>>({})
const form = reactive<loginInterface>({
  email: '',
  password: ''
})

const login = async () => {
  const isValid = validateForm(loginSchema, form, errors)
  if(!isValid) return
  if(!disabledLogin.value) {
    disabledLogin.value = true
    Alert.loading()
    try {
      await authService.login(form)
      Alert.success('Вы успешно вошли в систему')
      router.push('/')
    } catch (error: any) {
      disabledLogin.value = false
      Alert.error(error.response.data.message)
      console.log(error);
    }
  }
}


watch(form, () => {
  if (Object.keys(errors).length) {
    validateForm(loginSchema, form, errors)
  }
}, { deep: true })
</script>