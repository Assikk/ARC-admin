<template>
  <div class="relative">
    <Dots v-if="isLoadingPage" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"/>
    <div v-else class="flex flex-col gap-6 w-3/4">
      <h1 class="text-2xl font-bold">
        Добавление города
      </h1>
      <div class="grid grid-cols-3 gap-4">
        <Input id="title" label="Название"
        v-model="form.title" placeholder="Введите название"
        :error="errors.title ? true : false" :error-msg="errors.title"></Input>
        <Input id="description" label="Описание"
        v-model="form.description" placeholder="Введите описание"></Input>
        <Select placeholder="Выберите регион" id="region" v-model="form.regionId"
        :list="regionsList" text-list="title" value-list="id" label="Регион"
        :error="errors.regionId ? true : false" :error-msg="errors.regionId"></Select>
      </div>
      <div class="flex gap-4">
        <Button @click="edit" :disabled="disabledEdit">Изменить</Button>
        <Button @click="$router.push('/cities')" color="outlined">Назад</Button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Dots from '@/components/ui/loading/dots.vue'
import Input from '@/components/ui//inputs/default.vue'
import Button from '@/components/ui/buttons/default.vue'
import Select from '@/components/ui/selects/default.vue'
import { ref, onMounted, reactive, watch } from 'vue';
import { regionsService } from '@/services/regions.service';
import { listRegionSchema, type listRegionType } from '@/interfaces/region.interface';
import { useRoute, useRouter } from 'vue-router';
import { editCitySchema, type editCityType } from '@/interfaces/city.interface';
import { citiesService } from '@/services/cities.service';
import { validateForm } from '@/utils/validateForm';
import { useAlertStore } from '@/stores/alert';
defineOptions({
  name: 'EditCityComponent'
})

const isLoadingPage = ref<boolean>(true)
const isWatchForm = ref<boolean>(false)
const disabledEdit = ref<boolean>(false)
const regionsList = ref<listRegionType[]>([])
const route = useRoute()
const router = useRouter()
const Alert = useAlertStore()
const errors = reactive<Record<string, any>>({})
const form = reactive<editCityType>({
  title: '',
  description: '',
  regionId: ''
})

const getRegions = async () => {
  const res = await regionsService.getList()
  regionsList.value = listRegionSchema.array().parse(res.data)
}
const init = async () => {
  isLoadingPage.value = true
  await getRegions()
  const res = await citiesService.get(route.params.id as string)
  const data = editCitySchema.parse(res.data)
  Object.assign(form, data)
  isLoadingPage.value = false
}
const edit = async () => {
  const isValid = validateForm(editCitySchema, form, errors)
  isWatchForm.value = true
  if(!isValid) return
  if(!disabledEdit.value) {
    disabledEdit.value = true
    Alert.loading()
    try {
      await citiesService.edit(route.params.id as string, form)
      Alert.success('Город успешно изменен')
      router.push('/cities')
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
    validateForm(editCitySchema, form, errors)
  }
}, { deep: true })
</script>