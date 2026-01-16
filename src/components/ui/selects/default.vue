<template>
  <div class="flex flex-col space-y-2">
    <label v-if="label" :for="id" class="font-semibold text-gray-800">
      {{ label }}
    </label>
    <div class="relative w-full">
      <select
        v-bind="$attrs"
        :id="id"
        :disabled="disabled"
        :value="modelValue"
        @change="onChange"
        class="w-full appearance-none pl-4 pr-10 py-2 border-2 rounded-lg outline-none transition-all duration-300 focus:shadow-lg bg-white cursor-pointer"
        :class="selectClasses">
        <option v-if="placeholder" disabled value="" class="text-gray-400">
          {{ placeholder }}
        </option>
        <option
          v-for="(item, index) in list"
          :key="index"
          :value="item[valueList]">
          {{ item[textList] }}
        </option>
      </select>
      <ArrowDown class="w-5 h-5 text-[#5E6470] pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"/>
    </div>
    <p v-if="errorMsg" class="text-xs font-medium text-[#EF4444]">
      {{ errorMsg }}
    </p>
  </div>
</template>

<script setup lang="ts" generic="T">
import { computed} from 'vue';
import { ArrowDown } from 'lucide-vue-next';
defineOptions({ name: 'DefaultSelect' })

const props = withDefaults(
  defineProps<{
    id: string
    modelValue: T
    list: Record<string, any>[],
    valueList: string,
    textList: string,
    label?: string
    placeholder?: string
    error?: boolean
    errorMsg?: string
    disabled?: boolean,
  }>(),
  {
    error: false,
    disabled: false,
  }
)


const emit = defineEmits<{
  (e: 'update:modelValue', value: T): void
}>()


const onChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  const value: any = target.value
  emit('update:modelValue', value)
}

const selectClasses = computed(() => {
  if (props.disabled) return 'bg-gray-200 border-gray-400 text-gray-600 cursor-not-allowed opacity-75'
  if (props.error) return 'border-[#EF4444]'
  return 'border-gray-300 focus:border-blue-500 focus:shadow-blue-300/50'
})

</script>
