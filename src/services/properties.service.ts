import axios from '@/utils/axios'
import type { filterInterface } from '@/interfaces/property.interface'
export const propertiesService = {
  async getList(filter: filterInterface) {
    const res = await axios.post('properties/backoffice/search', filter)
    return res
  }
}