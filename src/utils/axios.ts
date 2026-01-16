import axios from "axios";
import Cookies from 'js-cookie'
import router from "@/router";
const instance = axios.create({
  // baseURL: 'http://172.28.198.47:8080/api/'
  baseURL: 'http://172.28.202.15:8080/api/',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

instance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error)
)
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 403) {
      Cookies.remove('token')
      router.push({ name: 'login' })
    }
    return Promise.reject(error)
  }
)


export default instance