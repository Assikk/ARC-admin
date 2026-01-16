<template>
  <div class="flex flex-col gap-6 w-3/4">
    <h1 class="text-2xl font-bold">
      Добавление региона
    </h1>
    <div class="grid grid-cols-3 gap-4">
      <Input id="title" label="Название"
      v-model="form.title"
      :error="errors.title ? true : false" :error-msg="errors.title"></Input>
      <Input id="description" label="Описание"
      v-model="form.description"
      :error="errors.description ? true : false" :error-msg="errors.description"></Input>
      <Input id="code" label="Код"
      v-model="form.code"
      :error="errors.code ? true : false" :error-msg="errors.code"></Input>
    </div>
    <div class="flex gap-4">
      <Button @click="add" :disabled="disabledAdd">Добавить</Button>
      <Button @click="$router.push('/regions')" color="outlined">Назад</Button>
    </div>
  </div>
</template>
<script setup lang="ts">
import Button from '@/components/ui/buttons/default.vue'
import Input from '@/components/ui/inputs/default.vue'
import { reactive, ref, watch } from 'vue';
import { addRegionSchema, type addRegionType } from '@/interfaces/region.interface';
import { validateForm } from '@/utils/validateForm';
import { useAlertStore } from '@/stores/alert';
import { regionsService } from '@/services/regions.service';
import { useRouter } from 'vue-router';

defineOptions({
  name: 'AddRegionComponent'
})

const Alert = useAlertStore()
const router = useRouter()
const form = reactive<addRegionType>({
  title: '',
  description: '',
  code: ''
})
const errors = reactive<Record<string, any>>({})
const isWatchForm = ref<boolean>(false)
const disabledAdd = ref<boolean>(false)


const add = async () => {
  const isValid = validateForm(addRegionSchema, form, errors)
  isWatchForm.value = true
  if(!isValid) return
  if(!disabledAdd.value) {
    disabledAdd.value = true
    Alert.loading()
    try {
      await regionsService.add(form)
      Alert.success('Регион успешно добавлен')
      router.push('/regions')
    } catch (error: any) {
      disabledAdd.value = false
      Alert.error(error.response.data.message)
    }
  }
}


watch(form, () => {
  if (isWatchForm.value) {
    validateForm(addRegionSchema, form, errors)
  }
}, { deep: true })
</script>