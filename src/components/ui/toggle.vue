<template>
  <div class="flex flex-col space-y-2">
    <p class="font-semibold text-gray-800">{{ label }}</p>
    <button
      type="button"
      role="switch"
      :aria-checked="modelValue"
      :disabled="disabled"
      @click="toggle"
      class="relative inline-flex items-center transition-colors duration-300 rounded-full focus:outline-none"
      :class="[
        sizeClasses.wrapper,
        modelValue ? 'bg-[#2D2926]' : 'bg-gray-300',
        disabled && 'opacity-50 cursor-not-allowed'
      ]"
    >
      <span
        class="inline-block bg-white rounded-full shadow transform transition-transform duration-300"
        :class="[
          sizeClasses.circle,
          modelValue ? sizeClasses.translateOn : sizeClasses.translateOff
        ]"
      />
    </button>
  </div>
</template>
<script setup lang="ts">
defineOptions({
  name: 'ToggleComponent'
})

const props = withDefaults(
  defineProps<{
    modelValue: boolean
    disabled?: boolean
    size?: 'sm' | 'md' | 'lg',
    label?: string
  }>(),
  {
    disabled: false,
    size: 'md'
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const toggle = () => {
  if (!props.disabled) {
    emit('update:modelValue', !props.modelValue)
  }
}

const sizeClasses = {
  sm: {
    wrapper: 'w-9 h-5',
    circle: 'w-4 h-4',
    translateOn: 'translate-x-4',
    translateOff: 'translate-x-1'
  },
  md: {
    wrapper: 'w-11 h-6',
    circle: 'w-5 h-5',
    translateOn: 'translate-x-5',
    translateOff: 'translate-x-1'
  },
  lg: {
    wrapper: 'w-14 h-8',
    circle: 'w-7 h-7',
    translateOn: 'translate-x-6',
    translateOff: 'translate-x-1'
  }
}[props.size]
</script>