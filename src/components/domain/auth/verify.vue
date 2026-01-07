<template>
  <div class="h-screen flex justify-center items-center bg-gray-100">
    <div class="w-[800px] bg-white p-6 rounded-lg shadow-lg flex flex-col gap-6">
      <h2 class="text-2xl font-semibold text-center text-gray-800">Верификация</h2>
      <div class="flex gap-8 justify-center">
        <Single
        v-for="(_, index) in CODE_LENGTH"
        :key="index"
        ref="inputs"
        :model-value="values[index]"
        @update:model-value="val => onInput(val, index)"
        @keydown="e => onKeydown(e, index)"
        @paste="onPaste"/>
      </div>
      <Button @click="send">Отправить</Button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, nextTick, watch } from 'vue';
import Single from '@/components/ui/inputs/single.vue';
import Button from '@/components/ui/buttons/default.vue'
import { ref } from 'vue';
defineOptions({
  name: 'VerifyComponent'
})


const CODE_LENGTH = 6
const values = ref<string[]>(Array(6).fill(''))
const inputs = ref<HTMLInputElement[]>([])
const code = computed(() => values.value.join(''))


const focusInput = (index: number) => {
  nextTick(() => {
    inputs.value[index]?.focus()
  })
}
const onInput = (value: string, index: number) => {
  if (!value) return

  values.value[index] = value

  if (index < CODE_LENGTH - 1) {
    focusInput(index + 1)
  }
}

const onKeydown = (e: KeyboardEvent, index: number) => {
  if (e.key === 'Backspace') {
    if (values.value[index]) {
      // очищаем текущий и всё справа
      for (let i = index; i < CODE_LENGTH; i++) {
        values.value[i] = ''
      }
    } else if (index > 0) {
      focusInput(index - 1)
      for (let i = index - 1; i < CODE_LENGTH; i++) {
        values.value[i] = ''
      }
    }
  }
}
const onPaste = (e: ClipboardEvent) => {
  const paste = e.clipboardData
    ?.getData('text')
    .replace(/\D/g, '')
    .slice(0, CODE_LENGTH)

  if (!paste) return

  paste.split('').forEach((char, i) => {
    values.value[i] = char
  })

  focusInput(Math.min(paste.length, CODE_LENGTH - 1))
}
const send = () => {
  console.log(code.value);
}

</script>