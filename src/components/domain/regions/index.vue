<template>
  <div class="flex flex-col gap-6">
    <div class="flex items-center justify-between gap-4">
      <h1 class="text-2xl font-bold">
        Список регионов
      </h1>
      <Button @click="$router.push('/regions/add')">
        Добавить
        <template #next>
          <Plus/>
        </template>
      </Button>
    </div>
    <Table :head="head" :is-loading="isLoadingPage" :is-pagination="false">
      <template #body>
        <tr v-for="item in list" :key="item.id">
          <td>
            {{ item.title }}
          </td>
          <td>
            {{ item.description }}
          </td>
          <td class="flex items-center justify-end gap-3">
            <RouterLink :to="`regions/edit/${item.id}`">
              <Pencil class="s-5 h-5 text-[#2D2926] cursor-pointer"/>
            </RouterLink>
            <RouterLink :to="`regions/${item.id}`">
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
import { Plus, Pencil, Eye } from 'lucide-vue-next';
import { ref, onMounted } from 'vue';
import { regionsService } from '@/services/regions.service';
import { listRegionSchema, type listRegionType } from '@/interfaces/region.interface';
import type { headTableInterface } from '@/interfaces/table.interface';
import Table from '@/components/ui/table.vue'
defineOptions({
  name: 'RegionsComponent'
})

const list = ref<listRegionType[]>([])
const head: headTableInterface[] = [
  {
    id: 1,
    label: 'Заголовок'
  },
  {
    id: 2,
    label: 'Описание'
  },
  {
    id: 3,
    label: ''
  }
]
const isLoadingPage = ref<boolean>(true)

const init = async () => {
  isLoadingPage.value = true
  const res = await regionsService.getList()
  list.value = listRegionSchema.array().parse(res.data)
  isLoadingPage.value = false
}


onMounted(async () => {
  await init()
})
</script>