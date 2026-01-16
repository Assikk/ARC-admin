import axios from '@/utils/axios'
import type { addRegionType, editRegionType } from '@/interfaces/region.interface'

export const regionsService = {
  async getList() {
    const res = await axios.get('regions')
    return res
  },
  async add(form: addRegionType) {
    await axios.post('regions', form)
  },
  async get(id: string) {
    const res = await axios.get(`regions/${id}`)
    return res
  },
  async edit(id: string, form: editRegionType) {
    await axios.put(`regions/${id}`, form)
  }
}