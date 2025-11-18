<template>
  <div class="flex flex-col space-y-2">
    <label :for="id" class="font-semibold text-gray-800">{{ label }}</label>
    <div class="relative">
      <input :type="type" :id="id" class="w-full pl-4 pr-12 py-2 border-2 rounded-lg outline-none transition-all duration-300 
      focus:shadow-lg placeholder:text-gray-500"
      :class="[disabled ? 'bg-gray-200 border-gray-400 text-gray-600 cursor-not-allowed opacity-75': 
      error ? 'border-[#EF4444]' : 'border-gray-300 focus:border-blue-500 focus:shadow-blue-300/50 ']"
      :placeholder="placeholder"
      :disabled="disabled"
      :value="modelValue"
      @input="onInput">
      <div class="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700">
        <svg
        class="cursor-pointer"
        width="20"
        height="20"
        fill="none"
        stroke="#99a3af"
        @click="clickIcon">
          <use :xlink:href="type === 'password' ? '#close-eye' : '#open-eye'"></use>
      </svg>
      </div>
    </div>
    <p v-if="errorMsg" class="text-xs font-medium text-[#EF4444]">
      {{ errorMsg }}
    </p>
  </div>
</template>

<script setup lang="ts" generic="T">
import { ref } from 'vue';
defineOptions({
  name: 'PasswordInput'
})
withDefaults(defineProps<{
  id: string,
  modelValue: T;
  label?: string,
  placeholder?: string,
  error?: boolean,
  errorMsg?: string,
  disabled?: boolean
}>(), {
  error: false,
  disabled: false
})
const type = ref('password')
const emit = defineEmits<{
  (e: 'update:modelValue', value: T): void;
}>();

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value as T);
}
const clickIcon = () => {
  if(type.value === 'password') {
    type.value = 'text'
  } else type.value = 'password'
}
</script>

