<template>
  <Transition name="fade-scale">
    <div v-if="Alert.isActive"
      class="fixed bottom-8 right-8 z-50 min-w-[360px] max-w-[90%] flex items-center gap-3 p-4 rounded-xl shadow-xl backdrop-blur-md border"
      :class="statusClass" >
      <svg
        class="cursor-pointer"
        width="20"
        height="20"
        :fill="icon.fill"
        :stroke="icon.stroke">
          <use :xlink:href="icon.svg"></use>
      </svg>

      <div class="flex-1 text-lg font-medium">
        {{ Alert.msg }}
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useAlertStore } from "@/stores/alert";

defineOptions({ name: "AlertComponent" });

const Alert = useAlertStore();


interface iconInterface {
  svg: string,
  fill: string,
  stroke: string
}

const statusClass = computed(() => {
  switch (Alert.type) {
    case "success":
      return "bg-green-50/70 border-green-300 text-green-800";
    case "error":
      return "bg-red-50/70 border-red-300 text-red-800";
    case "loading":
      return "bg-gray-50/70 border-gray-300 text-gray-700";
    default:
      return "";
  }
});
const icon = computed<iconInterface>(() => {
  switch (Alert.type) {
    case "success":
      return {
        svg: '#check',
        fill: 'none',
        stroke: '#065F46'
      };
    case "error":
      return {
        svg: '#close',
        fill: 'none',
        stroke: '#991B1B'
      };
    case "loading":
      return {
        svg: '#loading',
        fill: 'none',
        stroke: '#374151'
      };
    default:
      return {
        svg: '',
        fill: '',
        stroke: ''
      };
  }
});


</script>

<style scoped>
/* Плавная анимация появления */
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.25s ease;
}

.fade-scale-enter-from {
  opacity: 0;
  transform: translateY(10px) scale(0.96);
}

.fade-scale-leave-to {
  opacity: 0;
  transform: translateY(10px) scale(0.96);
}
</style>
