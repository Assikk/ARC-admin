<script setup lang="ts">
import { ref } from 'vue';
defineOptions({
  name: 'SingleInput'
})
const inputRef = ref<HTMLInputElement | null>(null)

defineExpose({
  focus: () => {
    inputRef.value?.focus()
  }
})
const props = withDefaults(defineProps<{
  modelValue: string | undefined
  label?: string
  error?: boolean
  errorMsg?: string
  disabled?: boolean,
}>(), {
  error: false,
  disabled: false,
})





const onBeforeInput = (e: InputEvent) => {
  if (e.data && !/^\d+$/.test(e.data)) {
    e.preventDefault()
  }
}
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'keydown', event: KeyboardEvent): void
  (e: 'paste', event: ClipboardEvent): void
}>();

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value as string);
}

</script>

<template>
  <div class="flex flex-col space-y-2">
    <label v-if="label" class="font-semibold text-gray-800">
      {{ label }}
    </label>

    <div class="flex gap-3">
      <input
        ref="inputRef"
        type="text"
        pattern="[0-9]*"
        autocomplete="one-time-code"
        inputmode="numeric"
        maxlength="1"
        :disabled="disabled"
        :value="modelValue"
        @beforeinput="onBeforeInput"
        @input="onInput"
        @keydown="$emit('keydown', $event)"
        @paste.prevent="$emit('paste', $event)"
        class="w-12 h-12 text-center text-lg font-semibold border-2 rounded-lg outline-none transition-all duration-300 placeholder:text-gray-500 focus:shadow-lg"
        :class="[ disabled ? 'bg-gray-200 border-gray-400 text-gray-600 cursor-not-allowed opacity-75' : error ? 'border-[#EF4444]' : 'border-gray-300 focus:border-blue-500 focus:shadow-blue-300/50']"
      />
    </div>

    <p v-if="errorMsg" class="text-xs font-medium text-[#EF4444]">
      {{ errorMsg }}
    </p>
  </div>
</template>
