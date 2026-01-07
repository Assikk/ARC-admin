<template>
  <div class="h-screen flex justify-center items-center bg-gray-100">
    <div class="w-[800px] bg-white p-6 rounded-lg shadow-lg">
      <h2 class="text-2xl font-semibold text-center text-gray-800">Регистрация</h2>
      <div class="grid grid-cols-2 gap-4 my-6">
        <Input v-model="form.email" id="email" label="Почта" placeholder="Введите почту" 
        :error="errors.email ? true : false" :error-msg="errors.email"/>
        <Password v-model="form.password" id="password" label="Пароль" placeholder="Введите пароль"
        :error="errors.password ? true : false" :error-msg="errors.password"/>
        <Input v-model="form.fullName" id="fullName" label="ФИО" placeholder="Введите ФИО" 
        :error="errors.fullName ? true : false" :error-msg="errors.fullName"/>
        <Input v-model="form.phone" id="phone" label="Телефон" placeholder="Введите номер телефона" 
        :error="errors.phone ? true : false" :error-msg="errors.phone"/>
        <Input v-model="form.city" id="city" label="Город" placeholder="Введите город" 
        :error="errors.city ? true : false" :error-msg="errors.city"/>
      </div>
      <div class="flex justify-between gap-4 items-center">
        <Button @click="login" :disabled="disabledAuth"> Регистрация </Button>
        <p>
          Уже есть аккаунт ?
          <RouterLink to="/auth/login" class="link">
            Авторизуйтесь
          </RouterLink>
        </p>
      </div>
      
    </div>
  </div>
</template>
<script setup lang="ts">
import Input from '@/components/ui/inputs/default.vue'
import Password from '@/components/ui/inputs/password.vue'
import Button from '@/components/ui/buttons/default.vue'
import { ref, reactive, watch } from 'vue'
import { useAlertStore } from '@/stores/alert'
import { authSchema } from '@/interfaces/auth.interface'
import { validateForm } from '@/utils/validateForm'
import { authService } from '@/services/auth.service'
import { useRouter } from 'vue-router'
import type { authInterface } from '@/interfaces/auth.interface'
defineOptions({
  name: 'RegisterComponent'
})
const Alert = useAlertStore()
const router = useRouter()
const disabledAuth = ref<boolean>(false)
const isWatchForm = ref<boolean>(false)
const errors = reactive<Record<string, any>>({})
const form = reactive<authInterface>({
  email: '',
  password: '',
  fullName: '',
  phone: '',
  city: '',
  role: 'SELLER',
  deviceId: ''
})

const login = async () => {
  const isValid = validateForm(authSchema, form, errors)
  isWatchForm.value = true
  if(!isValid) return
  if(!disabledAuth.value) {
    disabledAuth.value = true
    Alert.loading()
    try {
      await authService.auth(form)
      Alert.success('Вы успешно прошли регистрацию')
      router.push('/auth/verify')
    } catch (error: any) {
      disabledAuth.value = false
      Alert.error(error.response.data.message)
    }
  }
}


watch(form, () => {
  if (isWatchForm.value) {
    validateForm(authSchema, form, errors)
  }
}, { deep: true })
</script>