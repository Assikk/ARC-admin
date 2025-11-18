<template>
  <div class="flex flex-col space-y-2">
    <label :for="id" class="font-semibold text-gray-800">{{ label }}</label>
    <input type="text" :id="id" class="w-full px-4 py-2 border-2 rounded-lg outline-none transition-all duration-300 
    focus:shadow-lg placeholder:text-gray-500"
    :class="[disabled ? 'bg-gray-200 border-gray-400 text-gray-600 cursor-not-allowed opacity-75': 
    error ? 'border-[#EF4444]' : 'border-gray-300 focus:border-blue-500 focus:shadow-blue-300/50 ']"
    :placeholder="placeholder"
    :disabled="disabled"
    :value="modelValue"
    @input="onInput">
    <p v-if="errorMsg" class="text-xs font-medium text-[#EF4444]">
      {{ errorMsg }}
    </p>
  </div>
</template>

<script setup lang="ts" generic="T">
defineOptions({
  name: 'DefaultInput'
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

const emit = defineEmits<{
  (e: 'update:modelValue', value: T): void;
}>();

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value as T);
}
</script>

