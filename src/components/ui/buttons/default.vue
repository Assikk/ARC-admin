<template>
  <button class="min-w-[100px] p-3 font-semibold rounded-lg transition-colors cursor-pointer"
  :class="[color, full ? 'w-full' : 'self-center']"
  :disabled="disabled">
    <slot></slot>
  </button>
</template>
<script setup lang="ts">
defineOptions({
  name: 'DefaultButton'
})
withDefaults(defineProps<{
  color?: 'default' | 'danger' | 'green' | 'outlined'
  disabled?: boolean,
  full?: boolean
  }>(), {
    disabled: false,
    color: 'default',
    full: false
  })
</script>
<style scoped>
button:disabled {
  cursor: not-allowed;
}
.default {
  background: #3B82F6;
  border: none;
  color: white;
}
.default:not(:disabled):hover {
  background: #2563EB;
}
.danger {
  background: #EF4444;
  color: white;
}
.danger:not(:disabled):hover {
  background: #DC2626;
}
.green {
  background: #10B981;
  color: white;
}
.green:not(:disabled):hover {
  background: #059669;
}
.outlined {
  background: transparent;
  border: 2px solid #3B82F6;
  color: #3B82F6;
}
.outlined:not(:disabled):hover {
  background: rgba(59, 130, 246, 0.1);
  border-color: #2563EB;
}
</style>