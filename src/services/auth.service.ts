import axios from '@/utils/axios'
import type { loginInterface } from '@/interfaces/auth.interface'

export const authService = {
  async login(form: loginInterface) {
    const res = await axios.post('auth/login', form)
    return res
  }
}