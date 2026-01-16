<template>
  <div class="flex-1 relative w-full rounded-md border border-[#E5E7EB] flex flex-col justify-between bg-white">
    <div class="h-full flex justify-center items-center min-h-[660px]" v-if="isLoading">
      <Dots/>
    </div>
    <div v-else class="overflow-x-auto w-full h-full flex flex-col justify-between">
      <table class="w-full min-w-max">
        <thead>
          <tr>
            <th v-for="(item, index) in head" :key="index">
              <span>{{ item.label }}</span>
            </th>
          </tr>
          <tr>
            <slot name="search"></slot>
          </tr>
        </thead>
        <tbody>
          <slot name="body"></slot>
        </tbody>
      </table>
      <div v-if="isPagination" class="flex justify-between items-center px-4 pt-6 pb-4">
        <div class="flex items-center gap-3">
          <p class="text-sm">
            Показывать по
          </p>
          <Select id="size"
          :list="sizeList"
          textList="label" valueList="value" :model-value="size"
          @update:modelValue="value => emit('update:size', Number(value))"></Select>
        </div>
        <Pagination :pageCount="pageCount" @input="click"/>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Dots from './loading/dots.vue';
import type { headTableInterface } from '@/interfaces/table.interface';
import Pagination from './pagination.vue';
import Select from '@/components/ui/selects/default.vue'
defineOptions({
  name: 'TableComponent'
})
withDefaults(defineProps<{
isLoading: boolean,
head: headTableInterface[],
pageCount?: number,
isPagination?: boolean,
size?: number | string
}>(), {
  isLoading: true,
  isPagination: false
})

const emit = defineEmits<{
  (e: 'update:size', value: number): void
  (e: 'clickPage', page: number): void
}>()


const click = (page: number) => {
  emit('clickPage', page)
}

const sizeList = [
  {
    label: 5,
    value: 5
  },
  {
    label: 10,
    value: 10
  },
  {
    label: 20,
    value: 20
  },
  {
    label: 50,
    value: 50
  }
]
</script>