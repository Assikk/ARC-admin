<template>
  <header class="bg-white flex items-center justify-between px-6 py-2 shadow-lg">
    <button class="cursor-pointer w-[50px] h-[50px] rounded-[10px] bg-[#2D2926] flex flex-col items-center justify-center"
    @click="sidebar.toggle">
      <PanelLeftClose v-if="!sidebar.isCollapsed" class="w-6 h-6 text-white"/>
      <PanelRightClose v-else class="w-6 h-6 text-white"/>
    </button>
    <div class="flex items-center gap-3">
      <p class="font-medium text-lg">
        Тест Тестов
      </p>
      <button class=" cursor-pointer w-[50px] h-[50px] rounded-[10px] bg-[#2D2926] flex items-center justify-center">
        <LogOut class="w-6 h-6 text-white" />
      </button>
    </div>
  </header>
</template>
<script setup lang="ts">
import { PanelLeftClose, PanelRightClose, LogOut  } from 'lucide-vue-next';
import { useSidebarStore } from '@/stores/sidebar';


defineOptions({
  name: 'HeaderComponent'
})

const sidebar = useSidebarStore()
</script>