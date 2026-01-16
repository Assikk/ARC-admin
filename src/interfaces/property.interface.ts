import {z} from 'zod'

export interface propertyInterface {
  id: number,
  title: string,
  district: string,
  price: number | string,
  propertyTypeDescription: string,
  propertyTypeId: number | null,
  propertyListingType: number,
  currency: string,
  street: string,
  houseNumber: string,
  apartmentNumber: string,
  yearBuilt: number,
  description: string,
  isMortgage: boolean,
  isFeatured: boolean,
  isExchange: boolean,
  hasPlan: boolean,
  hasTechnicalPassport: boolean,
  latitude: number,
  longitude: number
}

export const propertySchema = z.object({
  id: z.number(),
  title: z.string().min(1, 'Введите название'),
  district: z.string(),
  // price: z.number(),
  price: z.union([z.string(), z.number()])
  .transform((val) => String(val))
  .refine(
    (val) => /^[1-9]\d*$/.test(val),
    'Введите цену'
  )
  .transform(Number),
  propertyTypeDescription: z.string(),
  propertyTypeId: z.number(),
  propertyListingType: z.number(),
  currency: z.string(),
  street: z.string().min(1, 'Введите улицу'),
  houseNumber: z.string().min(1, 'Введите дом'),
  apartmentNumber: z.string().min(1, 'Введите кв.'),
  yearBuilt: z.number(),
  description: z.string(),
  isMortgage: z.boolean(),
  isFeatured: z.boolean(),
  isExchange: z.boolean(),
  hasPlan: z.boolean(),
  hasTechnicalPassport: z.boolean(),
  latitude: z.number(),
  longitude: z.number()
})

export type listPropertyType = {
  id: propertyInterface['id']
  title: propertyInterface['title']
  district: propertyInterface['district']
  price: propertyInterface['price']
  propertyTypeDescription: propertyInterface['propertyTypeDescription']
}
export const listPropertySchema = z.object({
  id: propertySchema.shape.id,
  title: propertySchema.shape.title,
  district: propertySchema.shape.district,
  price: propertySchema.shape.price,
  propertyTypeDescription: propertySchema.shape.propertyTypeDescription
})

export type addPropertyType = {
  title: propertyInterface['title'],
  propertyTypeId: string,
  district: propertyInterface['district'],
  propertyListingType: string,
  price: propertyInterface['price'],
  currency: propertyInterface['currency'],
  street: propertyInterface['street'],
  houseNumber: propertyInterface['houseNumber'],
  apartmentNumber: propertyInterface['apartmentNumber'],
  yearBuilt: propertyInterface['yearBuilt'],
  description: propertyInterface['description'],
  isMortgage: propertyInterface['isMortgage'],
  isFeatured: propertyInterface['isFeatured'],
  isExchange: propertyInterface['isExchange'],
  hasPlan: propertyInterface['hasPlan'],
  hasTechnicalPassport: propertyInterface['hasTechnicalPassport'],
  latitude: propertyInterface['latitude'],
  longitude: propertyInterface['longitude']
}
export const addPropertySchema = z.object({
  title: propertySchema.shape.title,
  propertyTypeId: z.string().min(1, 'Выберите тип'),
  district: propertySchema.shape.district,
  propertyListingType: z.string().min(1, 'Выберите тип сделки'),
  price: propertySchema.shape.price,
  currency: propertySchema.shape.currency,
  street: propertySchema.shape.street,
  houseNumber: propertySchema.shape.houseNumber,
  apartmentNumber: propertySchema.shape.apartmentNumber,
  yearBuilt: propertySchema.shape.yearBuilt,
  description: propertySchema.shape.description,
  isMortgage: propertySchema.shape.isMortgage,
  isFeatured: propertySchema.shape.isFeatured,
  isExchange: propertySchema.shape.isExchange,
  hasPlan: propertySchema.shape.hasPlan,
  hasTechnicalPassport: propertySchema.shape.hasTechnicalPassport,
  latitude: propertySchema.shape.latitude,
  longitude: propertySchema.shape.longitude
})
export interface filterInterface {
  regionId: number,
  district: string,
  minPrice: number,
  maxPrice: number,
  propertyTypeId: number | null
  size: number,
  page: number
}