<template>
  <div class="bg-[#2D2926] py-8 transition-all duration-300"
    :class="sidebar.isCollapsed ? 'w-[72px] px-2' : 'w-[260px] px-4'">
    <img v-if="!sidebar.isCollapsed" src="@/assets/img/logo.svg"
      class="w-[120px] mx-auto" alt="Logo"/>

    <nav class="flex flex-col gap-2 mt-6">
      <RouterLink
        v-for="page in pages"
        :key="page.id"
        :to="page.link"
        :title="sidebar.isCollapsed ? page.name : ''"
        active-class="bg-white/15 text-white"
        class="group flex items-center justify-between px-4 py-3 rounded-xl text-gray-200 cursor-pointer transition-all duration-200 hover:bg-white/10 hover:text-white"
      >
        <div class="flex items-center gap-3">
          <component :is="page.icon"
            class="w-5 h-5 text-white transition-colors group-hover:text-white"/>

          <Transition name="fade-text">
            <span v-if="!sidebar.isCollapsed"
              class="font-medium whitespace-nowrap">
              {{ page.name }}
            </span>
          </Transition>
        </div>
        <ArrowRight v-if="!sidebar.isCollapsed"
        class="w-4 h-4 opacity-0 translate-x-[-4px] transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0"/>
      </RouterLink>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useSidebarStore } from '@/stores/sidebar';
import {
  ArrowRight,
  LayoutList,
  Users,
  Shield,
  Key,
  Building2,
  Map
} from 'lucide-vue-next';

defineOptions({ name: 'SidebarComponent' });

const sidebar = useSidebarStore();

const pages = ref([
  { id: 1, name: 'Объявления', icon: LayoutList, link: '/' },
  { id: 2, name: 'Пользователи', icon: Users, link: '/users' },
  { id: 3, name: 'Роли', icon: Shield, link: '/roles' },
  { id: 4, name: 'Привилегии', icon: Key, link: '/permissions' },
  { id: 5, name: 'Регионы', icon: Map, link: '/regions' },
  { id: 6, name: 'Города', icon: Building2, link: '/cities' },
]);
</script>

