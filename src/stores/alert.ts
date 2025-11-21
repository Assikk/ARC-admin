import { defineStore } from 'pinia';
export const useAlertStore = defineStore('alert', {
  state: (): {msg: string, type: 'success' | 'error' | 'loading' | '', isActive: boolean} => ({
    msg: '',
    type: '',
    isActive: false
  }),
  actions: {
    loading() {
      this.isActive = true,
      this.type = 'loading',
      this.msg = 'Идет загрузка, подождите...'
    },
    success(payload: string) {
      this.isActive = true,
      this.type = 'success',
      this.msg = payload
      setTimeout(() => {
        this.clear()
      }, 2000)
    },
    error(payload: string) {
      this.isActive = true,
      this.type = 'error',
      this.msg = payload
      setTimeout(() => {
        this.clear()
      }, 2000)
    },
    clear() {
      this.isActive = false,
      this.type = '',
      this.msg = ''
    }
  },
});
