import axios from '@/utils/axios'
import type { filterInterface } from '@/interfaces/city.interface'
import type { addCityType, editCityType } from '@/interfaces/city.interface'
export const citiesService = {
  async getList(params: filterInterface) {
    const cleanedParams = Object.fromEntries(
      Object.entries(params).filter(([_, v]) => v !== null && v !== undefined && v !== '')
    )
    const res = await axios.get('cities/filter', {params: cleanedParams})
    return res
  },
  async add(form: addCityType) {
    await axios.post('cities', form)
  },
  async get(id: string) {
    const res = await axios.get(`cities/${id}`)
    return res
  },
  async edit(id: string, form: editCityType) {
    await axios.put(`cities/${id}`, form)
  }
}