<template>
  <div class="flex flex-col gap-6">
    <div class="flex items-center justify-between gap-4">
      <h1 class="text-2xl font-bold">
        Список городов
      </h1>
      <div class="flex gap-4">
        <Button color="green" @click="isShowFilter = !isShowFilter">
          Фильтр
          <template #next>
            <Filter/>
          </template>
        </Button>
        <Button @click="$router.push('/cities/add')">
          Добавить
          <template #next>
            <Plus/>
          </template>
        </Button>
      </div>
    </div>
    <div v-if="isShowFilter" class="w-3/4">
      <div class="grid grid-cols-4 gap-4 mb-6">
        <Input placeholder="Введите название" id="title" label="Название" v-model="filter.title"/>
        <Input placeholder="Введите описание" id="title" label="description" v-model="filter.description"/>
        <Select placeholder="Выберите регион" id="region" v-model="filter.regionId"
        :list="regionsList" text-list="title" value-list="id" label="Регион"></Select>
      </div>
      <div class="flex gap-4">
        <Button @click="init">
          Применить фильтр
          <template #next>
            <FilterIcon/>
          </template>
        </Button>
        <Button color="outlined" @click="clearFilter">
          Отменить фильтр
          <template #next>
            <RotateCcw/>
          </template>
        </Button>
      </div>
    </div>
    <Table :head="head" :is-loading="isLoadingPage" :is-pagination="true" :page-count="pages" v-model:size="filter.size"
    @click-page="clickPage" @update:size="init">
      <template #body>
        <tr v-for="item in list" :key="item.id">
          <td>
            {{ item.title }}
          </td>
          <td>
            {{ item.description }}
          </td>
          <td>
            {{ item.regionName }}
          </td>
          <td class="flex items-center justify-end gap-3">
            <RouterLink :to="`cities/edit/${item.id}`">
              <Pencil class="s-5 h-5 text-[#2D2926] cursor-pointer"/>
            </RouterLink>
            <RouterLink :to="`cities/${item.id}`">
              <Eye class="s-5 h-5 text-[#2D2926] cursor-pointer"/>
            </RouterLink>
          </td>
        </tr>
      </template>
    </Table>
  </div>
</template>
<script setup lang="ts">
import Button from '@/components/ui/buttons/default.vue'
import Input from '@/components/ui/inputs/default.vue'
import { Plus, Pencil, Eye, Filter, FilterIcon, RotateCcw } from 'lucide-vue-next';
import { ref, onMounted, reactive } from 'vue';
import { citiesService } from '@/services/cities.service';
import { listCitySchema, type listCityType, type filterInterface } from '@/interfaces/city.interface';
import type { headTableInterface } from '@/interfaces/table.interface';
import Table from '@/components/ui/table.vue';
import { regionsService } from '@/services/regions.service';
import { listRegionSchema, type listRegionType } from '@/interfaces/region.interface';
import Select from '@/components/ui/selects/default.vue'


defineOptions({
  name: 'CitiesComponent'
})


const list = ref<listCityType[]>([])
const regionsList = ref<listRegionType[]>([])
const head: headTableInterface[] = [
  {
    id: 1,
    label: 'Название'
  },
  {
    id: 2,
    label: 'Описание'
  },
  {
    id: 3,
    label: 'Регион'
  },
  {
    id: 4,
    label: ''
  }
]
const isLoadingPage = ref<boolean>(true)
const pages = ref<number>(0)
const filter = reactive<filterInterface>({
  size: 10,
  page: 0,
  title: '',
  description: '',
  regionId: null
})
const isShowFilter = ref<boolean>(false)


const init = async () => {
  isLoadingPage.value = true
  const res = await citiesService.getList(filter)
  const data = listCitySchema.array().parse(res.data.content)
  list.value = data
  pages.value = res.data.totalPages
  isLoadingPage.value = false
}
const clickPage = async (page: number) => {
  filter.page = page - 1
  await init()
}
const clearFilter = async () => {
  Object.assign(filter, {
    size: 10,
    page: 0,
    title: '',
    description: '',
    regionId: null
  })
  await init()
}
const getRegions = async () => {
  const res = await regionsService.getList()
  regionsList.value = listRegionSchema.array().parse(res.data)
}



onMounted(async () => {
  await getRegions()
  await init()
})
</script>