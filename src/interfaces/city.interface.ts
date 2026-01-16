import {z} from 'zod'


export interface cityInterface {
  id: number,
  title: string,
  description: string,
  regionName: string,
  regionId: number,
  createdAt: string,
  updatedAt: string,
  createdBy: string,
  modifiedBy: string
}
export const citySchema = z.object({
  id: z.number(),
  title: z.string().min(1, 'Введите название'),
  description: z.string(),
  regionName: z.string(),
  regionId: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  createdBy: z.string(),
  modifiedBy: z.string()
})


export type listCityType = {
  id: cityInterface['id'],
  title: cityInterface['title'],
  description: cityInterface['description'],
  regionName: cityInterface['regionName']
}
export const listCitySchema = z.object({
  id: citySchema.shape.id,
  title: citySchema.shape.title,
  description: citySchema.shape.description,
  regionName: citySchema.shape.regionName
})

export interface filterInterface {
  size: number,
  page: number,
  title: string,
  description: '',
  regionId: number | null
}


export type addCityType = {
  title: cityInterface['title'],
  description: cityInterface['description'],
  regionId: string
}
export const addCitySchema = z.object({
  title: citySchema.shape.title,
  description: citySchema.shape.description,
  regionId: z.string().min(1, 'Выберите регион')
})
export type editCityType = {
  title: cityInterface['title'],
  description: cityInterface['description'],
  regionId: string
}
export const editCitySchema = z.object({
  title: citySchema.shape.title,
  description: citySchema.shape.description,
  regionId: z.coerce.string().min(1, 'Выберите регион')
})
export type showCityType = {
  id: cityInterface['id'],
  title: cityInterface['title'],
  description: cityInterface['description'],
  regionName: cityInterface['regionName'],
  createdAt: cityInterface['createdAt'],
  updatedAt: cityInterface['updatedAt'],
  createdBy: cityInterface['createdBy'],
  modifiedBy: cityInterface['modifiedBy']
}
export const showCitySchema = z.object({
  id: citySchema.shape.id,
  title: citySchema.shape.title,
  description: citySchema.shape.description,
  regionName: citySchema.shape.regionName,
  createdAt: citySchema.shape.createdAt,
  updatedAt: citySchema.shape.updatedAt,
  createdBy: citySchema.shape.createdBy,
  modifiedBy: citySchema.shape.modifiedBy
})