import axios from '@/utils/axios'
import type { loginInterface, authInterface } from '@/interfaces/auth.interface'

export const authService = {
  async login(form: loginInterface) {
    const res = await axios.post('auth/login', form)
    return res
  },
  async auth(form: authInterface) {
    const res = await axios.post('auth/register', form)
    return res
  }
}