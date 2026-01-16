<template>
  <div class="flex flex-col gap-6">
    <div class="flex items-center justify-between gap-4">
      <h1 class="text-2xl font-bold">
        Список объявлений
      </h1>
      <div class="flex gap-4">
        <Button color="green" @click="isShowFilter = !isShowFilter">
          Фильтр
          <template #next>
            <Filter/>
          </template>
        </Button>
        <Button @click="$router.push('/add')">
          Добавить
          <template #next>
            <Plus/>
          </template>
        </Button>
      </div>
    </div>
    <div v-if="isShowFilter" class="w-3/4 flex flex-col gap-6">
      <div class="grid grid-cols-4 gap-4">
        <Input placeholder="Введите район" id="district" label="Район" v-model="filter.district"/>
        <Select placeholder="Выберите тип" id="propertyTypeId" v-model="filter.propertyTypeId"
        :list="PROPERTY_TYPES" text-list="label" value-list="value" label="Тип"></Select>
        <Range
        label="Цена"
        v-model:min-value="filter.minPrice"
        v-model:max-value="filter.maxPrice"
        :min="0"
        :max="8000000"
        :step="1000"/>
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
    <Table :head="head" :is-loading="isLoadingPage" :is-pagination="true" :page-count="pages"
    @click-page="clickPage" v-model:size="filter.size" @update:size="init">
      <template #body>
        <tr v-for="item in list" :key="item.id">
          <td>
            {{ item.title }}
          </td>
          <td>
            {{ item.district }}
          </td>
          <td>
            {{ item.price }}
          </td>
          <td>
            {{ item.propertyTypeDescription }}
          </td>
          <td class="flex items-center justify-end gap-3">
            <RouterLink :to="`/edit/${item.id}`">
              <Pencil class="s-5 h-5 text-[#2D2926] cursor-pointer"/>
            </RouterLink>
            <RouterLink :to="`/show/${item.id}`">
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
import { Plus, Pencil, Eye, Filter, FilterIcon, RotateCcw } from 'lucide-vue-next';
import Table from '@/components/ui/table.vue';
import { ref, onMounted, reactive } from 'vue';
import type { headTableInterface } from '@/interfaces/table.interface';
import { propertiesService } from '@/services/properties.service';
import { listPropertySchema } from '@/interfaces/property.interface';
import type { listPropertyType, filterInterface } from '@/interfaces/property.interface';
import Input from '@/components/ui/inputs/default.vue'
import Range from '@/components/ui/range.vue'
import Select from '@/components/ui/selects/default.vue'
import { PROPERTY_TYPES } from '@/constants/properties/propertyTypes';
defineOptions({
  name: 'HomeComponent'
})


const head = ref<headTableInterface[]>([
  {
    id: 1,
    label: 'Название'
  },
  {
    id: 2,
    label: 'Район'
  },
  {
    id: 3,
    label: 'Цена'
  },
  {
    id: 4,
    label: 'Тип'
  },
  {
    id: 4,
    label: ''
  }
])
const isLoadingPage = ref<boolean>(false)
const isShowFilter = ref<boolean>(false)
const list = ref<listPropertyType[]>([])
const pages = ref<number>(0)
const filter = reactive<filterInterface>({
  regionId: 1,
  district: '',
  minPrice: 0,
  maxPrice: 8000000,
  propertyTypeId: null,
  size: 10,
  page: 0
})


const init = async () => {
  const res = await propertiesService.getList(filter)
  const data = listPropertySchema.array().parse(res.data.content)
  list.value = data
  pages.value = res.data.totalPages
}
const clickPage = async (page: number) => {
  filter.page = page - 1
  await init()
}
const clearFilter = async () => {
  Object.assign(filter, {
    regionId: 1,
    district: '',
    minPrice: 0,
    maxPrice: 8000000,
    propertyTypeId: null,
    size: 10,
    page: 0
  })
  await init()
}

onMounted(async () => {
  await init()
})
</script>