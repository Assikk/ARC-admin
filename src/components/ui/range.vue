<script setup lang="ts">
import { computed, ref, watch } from 'vue'

interface Props {
  min: number
  max: number
  step?: number,
  label?: string
  minValue: number
  maxValue: number 
}

const props = withDefaults(defineProps<Props>(), {
  step: 1,
})

const emit = defineEmits<{
  (e: 'update:minValue', value: number): void
  (e: 'update:maxValue', value: number): void
}>()

const left = ref(props.minValue)
const right = ref(props.maxValue)

watch(
  () => props.minValue,
  v => (left.value = v)
)

watch(
  () => props.maxValue,
  v => (right.value = v)
)

const update = () => {
  if (left.value > right.value) {
    ;[left.value, right.value] = [right.value, left.value]
  }

  emit('update:minValue', left.value)
  emit('update:maxValue', right.value)
}

const leftPercent = computed(
  () => ((left.value - props.min) / (props.max - props.min)) * 100
)

const rightPercent = computed(
  () => ((right.value - props.min) / (props.max - props.min)) * 100
)
</script>

<template>
  <div class="flex flex-col space-y-2">
    <p class="font-semibold text-gray-800">{{ label }}</p>
    <div class="range">
      <div class="range__track"></div>
      <div class="range__active" :style="{ left: leftPercent + '%', right: 100 - rightPercent + '%' }"></div>
      <input
        type="range"
        :min="min"
        :max="max"
        :step="step"
        v-model.number="left"
        @input="update"
      />
      <input
        type="range"
        :min="min"
        :max="max"
        :step="step"
        v-model.number="right"
        @input="update"
      />
      <div class="range__values">
        <span>{{ left }}</span>
        <span>{{ right }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.range {
  position: relative;
  width: 100%;
}

.range__track {
  position: absolute;
  height: 4px;
  background: #ddd;
  width: 100%;
  top: 8px;
  border-radius: 2px;
}

.range__active {
  position: absolute;
  height: 4px;
  background: #2D2926;
  top: 8px;
  border-radius: 2px;
}

input[type='range'] {
  position: absolute;
  width: 100%;
  pointer-events: none;
  appearance: none;
  background: none;
}

input[type='range']::-webkit-slider-thumb {
  pointer-events: all;
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #2D2926;
  cursor: pointer;
}

.range__values {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  font-size: 14px;
}
</style>
