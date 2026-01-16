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
        :list="regionslist" text-list="title" value-list="id" label="Регион"
        :error="errors.regionId ? true : false" :error-msg="errors.regionId"></Select>
      </div>
      <div class="flex gap-4">
        <Button @click="add" :disabled="disabledAdd">Добавить</Button>
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
import { ref, reactive, onMounted, watch } from 'vue';
import { regionsService } from '@/services/regions.service';
import { listRegionSchema, type listRegionType } from '@/interfaces/region.interface';
import { addCitySchema, type addCityType } from '@/interfaces/city.interface';
import { validateForm } from '@/utils/validateForm';
import { useAlertStore } from '@/stores/alert';
import { useRouter } from 'vue-router';
import { citiesService } from '@/services/cities.service';


defineOptions({
  name: 'AddCityComponent'
})


const isLoadingPage = ref<boolean>(true)
const isWatchForm = ref<boolean>(false)
const Alert = useAlertStore()
const router = useRouter()
const disabledAdd = ref<boolean>(false)
const regionslist = ref<listRegionType[]>([])
const form = reactive<addCityType>({
  title: '',
  description: '',
  regionId: ''
})
const errors = reactive<Record<string, any>>({})




const init = async () => {
  isLoadingPage.value = true
  const res = await regionsService.getList()
  regionslist.value = listRegionSchema.array().parse(res.data)
  isLoadingPage.value = false
}
const add = async () => {
  const isValid = validateForm(addCitySchema, form, errors)
  isWatchForm.value = true
  if(!isValid) return
  if(!disabledAdd.value) {
    disabledAdd.value = true
    Alert.loading()
    try {
      await citiesService.add(form)
      Alert.success('Город успешно добавлен')
      router.push('/cities')
    } catch (error: any) {
      disabledAdd.value = false
      Alert.error(error.response.data.message)
    }
  }
}

onMounted(async () => {
  await init()
})

watch(form, () => {
  if (isWatchForm.value) {
    validateForm(addCitySchema, form, errors)
  }
}, { deep: true })
</script>