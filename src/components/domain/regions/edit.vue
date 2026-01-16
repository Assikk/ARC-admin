<template>
  <div class="relative">
    <Dots v-if="isLoadingPage" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"/>
    <div v-else class="flex flex-col gap-6 w-3/4">
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
        <Button @click="edit" :disabled="disabledEdit">Изменить</Button>
        <Button @click="$router.push('/regions')" color="outlined">Назад</Button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Dots from '@/components/ui/loading/dots.vue'
import Button from '@/components/ui/buttons/default.vue'
import Input from '@/components/ui/inputs/default.vue'
import { useRoute, useRouter } from 'vue-router';
import { ref, reactive, onMounted, watch } from 'vue';
import { regionsService } from '@/services/regions.service';
import { editRegionSchema, type editRegionType } from '@/interfaces/region.interface';
import { validateForm } from '@/utils/validateForm';
import { useAlertStore } from '@/stores/alert';


defineOptions({
  name: 'EditRegionComponent'
})


const route = useRoute()
const Alert = useAlertStore()
const router = useRouter()
const disabledEdit = ref<boolean>(false)
const errors = reactive<Record<string, any>>({})
const isWatchForm = ref<boolean>(false)
const isLoadingPage = ref<boolean>(true)
const form = reactive<editRegionType>({
  id: 0,
  title: '',
  description: '',
  code: ''
})


const init = async () => {
  isLoadingPage.value = true
  const res = await regionsService.get(route.params.id as string)
  const data = editRegionSchema.parse(res.data)
  Object.assign(form, data)
  isLoadingPage.value = false
}


const edit = async () => {
  const isValid = validateForm(editRegionSchema, form, errors)
  isWatchForm.value = true
  if(!isValid) return
  if(!disabledEdit.value) {
    disabledEdit.value = true
    Alert.loading()
    try {
      await regionsService.edit(route.params.id as string, form)
      Alert.success('Регион успешно изменен')
      router.push('/regions')
    } catch (error: any) {
      disabledEdit.value = false
      Alert.error(error.response.data.message)
    }
  }
}

onMounted(async () => {
  await init()
})


watch(form, () => {
  if (isWatchForm.value) {
    validateForm(editRegionSchema, form, errors)
  }
}, { deep: true })
</script>