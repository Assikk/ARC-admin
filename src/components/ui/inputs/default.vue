<template>
  <div class="flex flex-col space-y-2">
    <label for="input" class="font-semibold text-gray-800">Введите текст</label>
    <input type="text" class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg outline-none transition-all duration-300 
    focus:border-blue-500 focus:shadow-lg focus:shadow-blue-300/50 placeholder:text-gray-500" 
    placeholder="Введите текст...">
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'DefaultInput'
})
</script>

