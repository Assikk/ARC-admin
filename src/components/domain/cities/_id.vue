<template>
  <div class="relative">
    <Dots v-if="isLoadingPage" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"/>
    <div v-else class="w-full px-6 py-2 space-y-4">
      <h1 class="text-2xl font-semibold text-gray-800">
        Просмотр города
      </h1>
      <div class="grid grid-cols-3 gap-4">
        <div class="p-5 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <h1 class="text-lg font-semibold text-gray-800">
            Название города
          </h1>
          <p class="text-gray-600 mt-1">
            {{ form.title || 'Нет данных для отображения' }}
          </p>
        </div>
        <div class="p-5 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <h1 class="text-lg font-semibold text-gray-800">Описание города</h1>
          <p class="text-gray-600 mt-1">
            {{ form.description || 'Нет данных для отображения' }}
          </p>
        </div>
        <div class="p-5 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <h1 class="text-lg font-semibold text-gray-800">
            Регион
          </h1>
          <p class="text-gray-600 mt-1">
            {{ form.regionName || 'Нет данных для отображения' }}
          </p>
        </div>
      </div>
      <div class="my-6 flex items-center text-sm text-gray-700">
        <div class="flex-grow h-px bg-gray-300"></div>
        <span class="px-3 whitespace-nowrap">
          Создано: {{ form.createdAt }}
        </span>
        <div class="w-32 h-px bg-gray-300"></div>
        <span class="px-3 whitespace-nowrap text-gray-500">
          Изменено: {{ form.updatedAt }}
        </span>
        <div class="flex-grow h-px bg-gray-300"></div>
      </div>
      <div class="my-6 flex items-center text-sm text-gray-700">
        <div class="flex-grow h-px bg-gray-300"></div>
        <span class="px-3 whitespace-nowrap">
          Кем создано: {{ form.createdBy }}
        </span>
        <div class="w-32 h-px bg-gray-300"></div>
        <span class="px-3 whitespace-nowrap text-gray-500">
          Кем изменено: {{ form.modifiedBy }}
        </span>
        <div class="flex-grow h-px bg-gray-300"></div>
      </div>
      <div class="flex justify-between items-center gap-4">
        <Button @click="$router.push('/cities')">
          Вернуться назад
        </Button>
        <p class="text-gray-800">
          Хотите
          <RouterLink
            :to="`/cities/add`"
            class="link"
          >
            добавить
          </RouterLink>
          или
          <RouterLink
            :to="`/cities/edit/${form.id}`"
            class="link"
          >
            изменить
          </RouterLink>
          данный регион?
        </p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import Button from '@/components/ui/buttons/default.vue'
import Dots from '@/components/ui/loading/dots.vue'
import { showCitySchema, type showCityType } from '@/interfaces/city.interface';
import { citiesService } from '@/services/cities.service';
import { useRoute } from 'vue-router';
import dayjs from 'dayjs';

defineOptions({
  name: 'ShowCityComponent'
})

const isLoadingPage = ref<boolean>(true)
const route = useRoute()
const form = reactive<showCityType>({
  id: 0,
  title: '',
  description: '',
  regionName: '',
  createdAt: '',
  updatedAt: '',
  createdBy: '',
  modifiedBy: ''
})

const init = async () => {
  isLoadingPage.value = true
  const res = await citiesService.get(route.params.id as string)
  res.data.createdAt = dayjs(res.data.createdAt).format('YYYY-MM-DD hh:mm:ss')
  res.data.updatedAt = dayjs(res.data.updatedAt).format('YYYY-MM-DD hh:mm:ss')
  const data = showCitySchema.parse(res.data)
  Object.assign(form, data)
  isLoadingPage.value = false
}


onMounted(async () => {
  await init()
})
</script>