import { defineStore } from 'pinia';
export const useSidebarStore = defineStore('sidebar', {
  state: (): {isCollapsed: boolean} => ({
    isCollapsed: true
  }),
  actions: {
    toggle() {
      this.isCollapsed = !this.isCollapsed
    }
  },
});
