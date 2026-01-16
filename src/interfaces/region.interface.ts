import {z} from 'zod'


export interface regionInterface {
  id: number,
  title: string,
  description: string,
  code: string | null,
  createdAt: string,
  updatedAt: string,
  createdBy: string,
  modifiedBy: string
}
export const regionSchema = z.object({
  id: z.number(),
  title: z.string().min(1, 'Введите название'),
  description: z.string().min(1, 'Введите описание'),
  code: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
  createdBy: z.string(),
  modifiedBy: z.string()
})

export type listRegionType = {
  id: regionInterface['id'],
  title: regionInterface['title'],
  description: regionInterface['description']
}
export const listRegionSchema = z.object({
  id: regionSchema.shape.id,
  title: regionSchema.shape.title,
  description: regionSchema.shape.description
})


export type addRegionType = {
  title: regionInterface['title'],
  description: regionInterface['description'],
  code: regionInterface['code']
}
export const addRegionSchema = z.object({
  title: regionSchema.shape.title,
  description: regionSchema.shape.description,
  code: regionSchema.shape.code
})

export type editRegionType = {
  id: regionInterface['id']
  title: regionInterface['title'],
  description: regionInterface['description'],
  code: regionInterface['code']
}
export const editRegionSchema = z.object({
  id: regionSchema.shape.id,
  title: regionSchema.shape.title,
  description: regionSchema.shape.description,
  code: regionSchema.shape.code
})

export type showRegionType = {
  id: regionInterface['id']
  title: regionInterface['title'],
  description: regionInterface['description'],
  code: regionInterface['code'],
  createdAt: regionInterface['createdAt'],
  updatedAt: regionInterface['updatedAt'],
  createdBy: regionInterface['createdBy'],
  modifiedBy: regionInterface['modifiedBy']
}
export const showRegionSchema = z.object({
  id: regionSchema.shape.id,
  title: regionSchema.shape.title,
  description: regionSchema.shape.description,
  code: regionSchema.shape.code,
  createdAt: regionSchema.shape.createdAt,
  updatedAt: regionSchema.shape.updatedAt,
  createdBy: regionSchema.shape.createdBy,
  modifiedBy: regionSchema.shape.modifiedBy
})