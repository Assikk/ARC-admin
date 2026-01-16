import axios from '@/utils/axios'
import type { loginInterface, authInterface } from '@/interfaces/auth.interface'
import Cookies from 'js-cookie'
export const authService = {
  async login(form: loginInterface) {
    const res = await axios.post('auth/login', form)
    Cookies.set('token', res.data.token, {
      expires: 7,
      secure: false,
      sameSite: 'lax',
      path: '/'
    })
    return res
  },
  async auth(form: authInterface) {
    const res = await axios.post('auth/register', form)
    return res
  }
}